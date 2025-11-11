export interface Hairstyle {
  id: string;
  name: string;
  imageUrl: string;
  gender: 'women' | 'men';
}

export const womenHairstyles: Hairstyle[] = [
  { id: 'w1', name: 'Long Layers', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Long+Layers', gender: 'women' },
  { id: 'w2', name: 'Bob Cut', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Bob+Cut', gender: 'women' },
  { id: 'w3', name: 'Pixie Cut', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Pixie+Cut', gender: 'women' },
  { id: 'w4', name: 'Beach Waves', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Beach+Waves', gender: 'women' },
  { id: 'w5', name: 'Balayage', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Balayage', gender: 'women' },
  { id: 'w6', name: 'Shag Cut', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Shag+Cut', gender: 'women' },
  { id: 'w7', name: 'Lob (Long Bob)', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Lob', gender: 'women' },
  { id: 'w8', name: 'Curtain Bangs', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Curtain+Bangs', gender: 'women' },
  { id: 'w9', name: 'Updo', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Updo', gender: 'women' },
  { id: 'w10', name: 'French Braid', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=French+Braid', gender: 'women' },
  { id: 'w11', name: 'High Ponytail', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=High+Ponytail', gender: 'women' },
  { id: 'w12', name: 'Messy Bun', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Messy+Bun', gender: 'women' },
  { id: 'w13', name: 'Sleek Straight', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Sleek+Straight', gender: 'women' },
  { id: 'w14', name: 'Curly Bob', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Curly+Bob', gender: 'women' },
  { id: 'w15', name: 'Butterfly Cut', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Butterfly+Cut', gender: 'women' },
  { id: 'w16', name: 'Wolf Cut', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Wolf+Cut', gender: 'women' },
];

export const menHairstyles: Hairstyle[] = [
  { id: 'm1', name: 'Classic Fade', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Classic+Fade', gender: 'men' },
  { id: 'm2', name: 'Buzz Cut', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Buzz+Cut', gender: 'men' },
  { id: 'm3', name: 'Undercut', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Undercut', gender: 'men' },
  { id: 'm4', name: 'Pompadour', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Pompadour', gender: 'men' },
  { id: 'm5', name: 'Quiff', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Quiff', gender: 'men' },
  { id: 'm6', name: 'Slick Back', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Slick+Back', gender: 'men' },
  { id: 'm7', name: 'Crew Cut', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Crew+Cut', gender: 'men' },
  { id: 'm8', name: 'Mohawk', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Mohawk', gender: 'men' },
  { id: 'm9', name: 'French Crop', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=French+Crop', gender: 'men' },
  { id: 'm10', name: 'Textured Crop', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Textured+Crop', gender: 'men' },
  { id: 'm11', name: 'Side Part', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Side+Part', gender: 'men' },
  { id: 'm12', name: 'Faux Hawk', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Faux+Hawk', gender: 'men' },
  { id: 'm13', name: 'High Fade', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=High+Fade', gender: 'men' },
  { id: 'm14', name: 'Low Fade', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Low+Fade', gender: 'men' },
  { id: 'm15', name: 'Taper Fade', imageUrl: 'https://via.placeholder.com/200/8B5CF6/FFFFFF?text=Taper+Fade', gender: 'men' },
  { id: 'm16', name: 'Curly Top', imageUrl: 'https://via.placeholder.com/200/EC4899/FFFFFF?text=Curly+Top', gender: 'men' },
];

export const allHairstyles: Hairstyle[] = [...womenHairstyles, ...menHairstyles];
