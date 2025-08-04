'use server';

/**
 * @fileOverview A product suggestion AI agent.
 *
 * - suggestRelatedProducts - A function that suggests related products based on items in the cart.
 * - SuggestRelatedProductsInput - The input type for the suggestRelatedProducts function.
 * - SuggestRelatedProductsOutput - The return type for the suggestRelatedProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedProductsInputSchema = z.object({
  cartItems: z.array(
    z.string().describe('Name of item in the cart.')
  ).describe('The names of the items currently in the cart.'),
});
export type SuggestRelatedProductsInput = z.infer<typeof SuggestRelatedProductsInputSchema>;

const SuggestRelatedProductsOutputSchema = z.object({
  suggestions: z.array(
    z.string().describe('Suggested related product.')
  ).describe('A list of suggested related products based on the cart items.'),
});
export type SuggestRelatedProductsOutput = z.infer<typeof SuggestRelatedProductsOutputSchema>;

export async function suggestRelatedProducts(input: SuggestRelatedProductsInput): Promise<SuggestRelatedProductsOutput> {
  return suggestRelatedProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedProductsPrompt',
  input: {schema: SuggestRelatedProductsInputSchema},
  output: {schema: SuggestRelatedProductsOutputSchema},
  prompt: `You are a helpful shopping assistant. A user has the following items in their cart:

{{#each cartItems}}
- {{this}}
{{/each}}

Suggest other products that the user might be interested in purchasing, based on the items in their cart. Return a maximum of 5 suggestions.

Format your output as a JSON array of strings.`,
});

const suggestRelatedProductsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedProductsFlow',
    inputSchema: SuggestRelatedProductsInputSchema,
    outputSchema: SuggestRelatedProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
