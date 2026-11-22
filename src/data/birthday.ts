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
    salutation: "Dearest Bella,",
    paragraphs: [
      "Happy 22nd Birthday! Today marks the beginning of a brand-new chapter in your story—one that I hope is filled with boundless joy, peace of mind, and all the quiet moments of wonder you so richly deserve.",
      "Reaching twenty-two is a milestone of blossoming. You are stepping into a season where your dreams take deeper root, your wisdom grows brighter, and your presence touches everyone around you with warmth and grace.",
      "As you embark on this year, my deepest prayer is for your happiness and good health. May you always find the strength to navigate every challenge, the courage to chase whatever sets your soul on fire, and the gentle reminder to celebrate yourself at every step along the way.",
      "Never forget how truly special, resilient, and cherished you are. May life be endlessly gentle with your heart, and may this year bring you closer to everything you have ever dared to wish for."
    ],
    closing: "With all my love,",
    signature: "Always"
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
