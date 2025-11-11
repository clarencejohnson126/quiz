export interface Hairstyle {
  id: string;
  name: string;
  imageUrl: string;
  gender: 'women' | 'men';
}

export const womenHairstyles: Hairstyle[] = [
  { id: 'w1', name: 'Long Layers', imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w2', name: 'Bob Cut', imageUrl: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w3', name: 'Pixie Cut', imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w4', name: 'Beach Waves', imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w5', name: 'Balayage', imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w6', name: 'Shag Cut', imageUrl: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w7', name: 'Lob (Long Bob)', imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w8', name: 'Curtain Bangs', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w9', name: 'Updo', imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w10', name: 'French Braid', imageUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w11', name: 'High Ponytail', imageUrl: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w12', name: 'Messy Bun', imageUrl: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w13', name: 'Sleek Straight', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w14', name: 'Curly Bob', imageUrl: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w15', name: 'Butterfly Cut', imageUrl: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=400&fit=crop', gender: 'women' },
  { id: 'w16', name: 'Wolf Cut', imageUrl: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?w=400&h=400&fit=crop', gender: 'women' },
];

export const menHairstyles: Hairstyle[] = [
  { id: 'm1', name: 'Classic Fade', imageUrl: 'https://images.unsplash.com/photo-1560575801-c45c98fd5f7d?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm2', name: 'Buzz Cut', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm3', name: 'Undercut', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm4', name: 'Pompadour', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm5', name: 'Quiff', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm6', name: 'Slick Back', imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm7', name: 'Crew Cut', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm8', name: 'Mohawk', imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm9', name: 'French Crop', imageUrl: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm10', name: 'Textured Crop', imageUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm11', name: 'Side Part', imageUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm12', name: 'Faux Hawk', imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm13', name: 'High Fade', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&sat=-100', gender: 'men' },
  { id: 'm14', name: 'Low Fade', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm15', name: 'Taper Fade', imageUrl: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=400&h=400&fit=crop', gender: 'men' },
  { id: 'm16', name: 'Curly Top', imageUrl: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&h=400&fit=crop', gender: 'men' },
];

export const allHairstyles: Hairstyle[] = [...womenHairstyles, ...menHairstyles];
