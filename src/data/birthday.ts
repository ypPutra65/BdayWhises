export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  caption: string;
  tag: string;
  numeral: string;
}

export interface BirthdayData {
  recipient: string;
  chapter: string;
  title: string;
  subtitle: string;
  waxSealText: string;
  envelopeHint: string;
  revealHeadline: string;
  revealSubline: string;
  letter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    description: string;
    photos: GalleryPhoto[];
  };
  cake: {
    candleCount: number;
    title: string;
    instructions: string;
    buttonText: string;
    afterWishMessage: string;
    quote: string;
  };
}

export const birthdayData: BirthdayData = {
  recipient: "Bella",
  chapter: "XXII",
  title: "Bella",
  subtitle: "A Letter For Your Twenty-Second Chapter",
  waxSealText: "XXII",
  envelopeHint: "Click to open",
  revealHeadline: "HAPPY BIRTHDAY, BELLA",
  revealSubline: "Chapter XXII",
  letter: {
    salutation: "Happy 22nd Birthday, Bella!",
    paragraphs: [
      "I hope this new chapter brings you closer to God and makes your faith even stronger. I hope you always become someone who brings happiness and good things to the people around you.",
      "May everything you're working hard for go smoothly, and may all your dreams slowly come true. Always stay true to yourself and the people who matter to you.",
      "I hope things get easier for you, even on the difficult days. Keep growing, be more patient, and leave behind the negative things that don't help you become a better person.",
      "You deserve so many beautiful things in life. Here's to a wonderful year ahead. Enjoy your special day!"
    ],
    closing: "With Love,",
    signature: "Putra"
  },
  gallery: {
    title: "Moments in Light",
    subtitle: "A Portrait of Chapter XXII",
    description: "Every summit reached, every unscripted laugh, and every quiet moment of serenity—captured in the grace of your journey.",
    photos: [
      {
        id: "merbabu",
        src: "/images/bella/bella-merbabu.jpg",
        title: "Above the Clouds",
        subtitle: "Mount Merbabu · 2,760 MDPL",
        caption: "Conquering summits with pure joy, bright courage, and an adventurous soul.",
        tag: "Adventure",
        numeral: "I"
      },
      {
        id: "golden-hour",
        src: "/images/bella/bella-golden-hour.jpg",
        title: "Golden Hour Glow",
        subtitle: "Sunlit Warmth",
        caption: "The radiant, playful smile that brings warmth and quiet magic to any path.",
        tag: "Radiance",
        numeral: "II"
      },
      {
        id: "crater",
        src: "/images/bella/bella-crater.jpg",
        title: "Earth & Skies",
        subtitle: "Highland Solitude",
        caption: "Poised amidst the mist and open skies, calm, confident, and deeply inspiring.",
        tag: "Serenity",
        numeral: "III"
      },
      {
        id: "windblown",
        src: "/images/bella/bella-windblown.jpg",
        title: "Whispers in the Wind",
        subtitle: "Candid Grace",
        caption: "Gentle, thoughtful, and free—a timeless glimpse into your effortless beauty.",
        tag: "Grace",
        numeral: "IV"
      }
    ]
  },
  cake: {
    candleCount: 22,
    title: "Make a Wish, Bella",
    instructions: "Hold a quiet wish in your heart, and blow out the twenty-two candles.",
    buttonText: "Blow Out the Candles",
    afterWishMessage: "Your wish is carried into this new year",
    quote: "May all your quiet prayers, unspoken hopes, and sweetest dreams come true in Chapter XXII."
  }
};
