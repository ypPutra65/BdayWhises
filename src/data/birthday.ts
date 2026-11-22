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
  cake: {
    candleCount: 22,
    title: "Make a Wish, Bella",
    instructions: "Hold a quiet wish in your heart, and blow out the twenty-two candles.",
    buttonText: "Blow Out the Candles",
    afterWishMessage: "Your wish is carried into this new year",
    quote: "May all your quiet prayers, unspoken hopes, and sweetest dreams come true in Chapter XXII."
  }
};
