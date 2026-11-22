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
  title: "BELLA — CHAPTER XXII",
  subtitle: "A Special Letter For You",
  waxSealText: "XXII",
  envelopeHint: "Tap the seal to open your letter",
  revealHeadline: "HAPPY BIRTHDAY, BELLA",
  revealSubline: "XXII — A NEW CHAPTER BEGINS",
  letter: {
    salutation: "Dearest Bella,",
    paragraphs: [
      "Happy 22nd Birthday! Today marks the beginning of a brand-new chapter in your story—one that I hope is filled with boundless joy, peace of mind, and all the quiet moments of wonder you so richly deserve.",
      "Reaching twenty-two is a milestone of blossoming. You are stepping into a season where your dreams take deeper root, your wisdom grows brighter, and your presence touches everyone around you with warmth and grace.",
      "As you embark on this year, my deepest prayer is for your happiness and good health. May you always find the strength to navigate every challenge, the courage to chase whatever sets your soul on fire, and the gentle reminder to celebrate yourself at every step along the way.",
      "Never forget how truly special, resilient, and cherished you are. May life be endlessly gentle with your heart, and may this year bring you closer to everything you have ever dared to wish for."
    ],
    closing: "With love and warmest wishes,",
    signature: "Always for you,"
  },
  cake: {
    candleCount: 22,
    title: "MAKE A WISH, BELLA",
    instructions: "Close your eyes, hold a wish in your heart, and blow out the candles.",
    buttonText: "Make a Wish",
    afterWishMessage: "Your wish has been released into the universe.",
    quote: "“May all your quiet prayers, unspoken hopes, and sweetest dreams come true in Chapter XXII.”"
  }
};
