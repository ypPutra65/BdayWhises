type AudioListener = (isPlaying: boolean) => void;

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<AudioListener> = new Set();
  private isMutedByUser: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.init();
    }
  }

  private init() {
    if (this.audio) return;
    this.audio = new Audio("/music/birthday.mp3");
    this.audio.loop = true;
    this.audio.volume = 0.6;
    this.audio.preload = "auto";

    this.audio.addEventListener("play", () => this.notify(true));
    this.audio.addEventListener("pause", () => this.notify(false));
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    if (this.audio) {
      listener(!this.audio.paused);
    }
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(isPlaying: boolean) {
    this.listeners.forEach((listener) => listener(isPlaying));
  }

  public play() {
    if (this.isMutedByUser) return;
    if (!this.audio && typeof window !== "undefined") {
      this.init();
    }
    if (this.audio) {
      this.audio.play().catch((err) => {
        console.warn("Audio autoplay blocked by browser:", err);
      });
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  public toggle(): boolean {
    if (!this.audio && typeof window !== "undefined") {
      this.init();
    }
    if (!this.audio) return false;

    if (this.audio.paused) {
      this.isMutedByUser = false;
      this.audio.play().catch((err) => console.warn(err));
      return true;
    } else {
      this.isMutedByUser = true;
      this.audio.pause();
      return false;
    }
  }

  public isPlaying(): boolean {
    return this.audio ? !this.audio.paused : false;
  }
}

export const audioManager = new AudioManager();
