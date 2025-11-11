/**
 * Hairstyle Loader
 * 
 * Mock implementation for loading hairstyles.
 * Ready to be replaced with Supabase integration.
 * 
 * Future integration:
 * - Replace mockHairstyles with Supabase query
 * - Add caching layer
 * - Add error handling
 * - Add pagination for large datasets
 */

import { Hairstyle } from './types';

// Mock hairstyle data - Replace with Supabase query
const mockHairstyles: Hairstyle[] = [
  { id: '1', name: 'Classic Fade', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Classic+Fade' },
  { id: '2', name: 'Buzz Cut', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Buzz+Cut' },
  { id: '3', name: 'Undercut', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Undercut' },
  { id: '4', name: 'Pompadour', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Pompadour' },
  { id: '5', name: 'Quiff', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Quiff' },
  { id: '6', name: 'Slick Back', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Slick+Back' },
  { id: '7', name: 'Crew Cut', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Crew+Cut' },
  { id: '8', name: 'Mohawk', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Mohawk' },
  { id: '9', name: 'French Crop', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=French+Crop' },
  { id: '10', name: 'Textured Crop', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Textured+Crop' },
  { id: '11', name: 'Side Part', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Side+Part' },
  { id: '12', name: 'Faux Hawk', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Faux+Hawk' },
  { id: '13', name: 'High Fade', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=High+Fade' },
  { id: '14', name: 'Low Fade', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Low+Fade' },
  { id: '15', name: 'Taper Fade', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Taper+Fade' },
  { id: '16', name: 'Curly Top', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Curly+Top' },
];

/**
 * Loads hairstyles from the database
 * 
 * TODO: Replace with Supabase integration
 * 
 * @param limit - Maximum number of hairstyles to return
 * @returns Promise<Hairstyle[]> - Array of hairstyles
 */
export async function loadHairstyles(limit: number = 50): Promise<Hairstyle[]> {
  // Simulate async database call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return shuffled mock data
      const shuffled = [...mockHairstyles].sort(() => Math.random() - 0.5);
      resolve(shuffled.slice(0, limit));
    }, 100);
  });
}

/**
 * Loads hairstyles from Supabase (Future implementation)
 * 
 * Example implementation:
 * 
 * import { createClient } from '@supabase/supabase-js';
 * 
 * const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
 * 
 * export async function loadHairstyles(limit: number = 50): Promise<Hairstyle[]> {
 *   const { data, error } = await supabase
 *     .from('hairstyles')
 *     .select('id, name, image_url, category, tags')
 *     .limit(limit);
 * 
 *   if (error) {
 *     console.error('Error loading hairstyles:', error);
 *     return [];
 *   }
 * 
 *   return data.map(item => ({
 *     id: item.id,
 *     name: item.name,
 *     imageUrl: item.image_url,
 *     category: item.category,
 *     tags: item.tags,
 *   }));
 * }
 */

/**
 * Gets random hairstyles for the game
 * 
 * @param count - Number of unique hairstyles needed (will be doubled for pairs)
 * @returns Promise<Hairstyle[]> - Array of unique hairstyles
 */
export async function getRandomHairstyles(count: number): Promise<Hairstyle[]> {
  const allHairstyles = await loadHairstyles();
  
  if (allHairstyles.length < count) {
    console.warn(`Not enough hairstyles available. Requested: ${count}, Available: ${allHairstyles.length}`);
    return allHairstyles;
  }
  
  // Shuffle and take first 'count' items
  const shuffled = [...allHairstyles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

