export interface Herb {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  history: string;
  benefits: string[];
  usage: string[];
  precautions: string;
  scientificInfo: string;
}

export const HERBS: Herb[] = [
  {
    id: 'tulsi',
    name: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum sanctum',
    image: 'https://pollinations.ai/p/botanical_illustration_of_a_tulsi_plant_white_background?width=800&height=600&seed=tulsi',
    history: 'Tulsi is revered in Ayurveda as the "Queen of Herbs" and is considered a sacred plant in Hindu culture, often found in courtyards.',
    benefits: ['Boosts immunity', 'Reduces stress', 'Supports respiratory health', 'Anti-inflammatory'],
    usage: ['Tulsi tea (boil leaves in water)', 'Chew raw leaves', 'Tulsi extract'],
    precautions: 'May interact with blood-thinning medications.',
    scientificInfo: 'Contains eugenol, ursolic acid, and rosmarinic acid which provide antioxidant and anti-inflammatory properties.'
  },
  {
    id: 'neem',
    name: 'Neem',
    scientificName: 'Azadirachta indica',
    image: 'https://pollinations.ai/p/botanical_illustration_of_a_neem_plant_white_background?width=800&height=600&seed=neem',
    history: 'Known as "Sarva Roga Nivarini" (curer of all ailments) in Ayurveda, Neem has been used for centuries for its potent medicinal properties.',
    benefits: ['Skin health', 'Anti-bacterial', 'Blood purifier', 'Oral hygiene'],
    usage: ['Neem paste for skin', 'Neem leaf tea', 'Neem oil for hair/skin'],
    precautions: 'Avoid in pregnancy and for those trying to conceive.',
    scientificInfo: 'Rich in nimbin, nimbidin, and azadirachtin, which exhibit strong antimicrobial and antifungal effects.'
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    image: 'https://pollinations.ai/p/botanical_illustration_of_an_ashwagandha_plant_white_background?width=800&height=600&seed=ashwagandha',
    history: 'A vital herb in Ayurveda, Ashwagandha is classified as an adaptogen, helping the body manage stress and restore balance.',
    benefits: ['Reduces anxiety', 'Improves sleep', 'Boosts energy', 'Supports cognitive function'],
    usage: ['Ashwagandha powder with warm milk', 'Capsules/tablets'],
    precautions: 'May cause drowsiness; consult doctor if on thyroid medication.',
    scientificInfo: 'Contains withanolides, which are responsible for its adaptogenic and neuroprotective effects.'
  },
  {
    id: 'turmeric',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    image: 'https://pollinations.ai/p/botanical_illustration_of_a_turmeric_plant_white_background?width=800&height=600&seed=turmeric',
    history: 'Turmeric has been a staple in Ayurveda and Indian cuisine for thousands of years, celebrated for its vibrant color and healing properties.',
    benefits: ['Powerful anti-inflammatory', 'Antioxidant', 'Supports joint health', 'Improves digestion'],
    usage: ['Golden milk (turmeric with warm milk)', 'Add to curries', 'Turmeric tea'],
    precautions: 'High doses may cause stomach upset; consult doctor if on blood thinners.',
    scientificInfo: 'Contains curcumin, a bioactive compound with potent anti-inflammatory and antioxidant effects.'
  },
  {
    id: 'amla',
    name: 'Amla (Indian Gooseberry)',
    scientificName: 'Phyllanthus emblica',
    image: 'https://pollinations.ai/p/botanical_illustration_of_an_amla_plant_white_background?width=800&height=600&seed=amla',
    history: 'Amla is considered a Rasayana (rejuvenator) in Ayurveda, believed to promote longevity and overall health.',
    benefits: ['High Vitamin C', 'Supports digestion', 'Hair and skin health', 'Immune booster'],
    usage: ['Amla juice', 'Amla powder', 'Raw fruit', 'Amla murabba'],
    precautions: 'May increase acidity in some individuals.',
    scientificInfo: 'Extremely rich in Vitamin C, tannins, and polyphenols, providing strong antioxidant protection.'
  }
];
