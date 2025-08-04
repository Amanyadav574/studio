'use server';
/**
 * @fileOverview An image generation AI agent that saves the image to a file.
 *
 * - generateAndSaveImage - A function that generates an image and saves it.
 * - GenerateAndSaveImageInput - The input type for the function.
 * - GenerateAndSaveImageOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const GenerateAndSaveImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateAndSaveImageInput = z.infer<typeof GenerateAndSaveImageInputSchema>;

const GenerateAndSaveImageOutputSchema = z.object({
  imageUrl: z.string().describe("The public URL of the generated image."),
});
export type GenerateAndSaveImageOutput = z.infer<typeof GenerateAndSaveImageOutputSchema>;

export async function generateAndSaveImage(input: GenerateAndSaveImageInput): Promise<GenerateAndSaveImageOutput> {
  return generateAndSaveImageFlow(input);
}

const generateAndSaveImageFlow = ai.defineFlow(
  {
    name: 'generateAndSaveImageFlow',
    inputSchema: GenerateAndSaveImageInputSchema,
    outputSchema: GenerateAndSaveImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A professional, clean, high-resolution product photograph of ${input.prompt}, on a plain white background.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }
    
    // Extract base64 data
    const base64Data = media.url.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    const filename = `${uuidv4()}.png`;
    const imageDir = path.join(process.cwd(), 'public', 'generated-images');
    
    // Ensure directory exists
    await fs.mkdir(imageDir, { recursive: true });
    
    const imagePath = path.join(imageDir, filename);
    await fs.writeFile(imagePath, imageBuffer);
    
    const imageUrl = `/generated-images/${filename}`;

    return { imageUrl };
  }
);
