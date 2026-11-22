// Ambient music generator using Web Audio API as a fallback or ambient soundtrack
class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: NodeJS.Timeout | null = null;
  private masterGain: GainNode | null = null;

  public start() {
    if (this.isPlaying) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      this.isPlaying = true;

      // Romantic, cinematic chords progression (Fmaj7 - C - Dm9 - Bb)
      const chords = [
        [174.61, 220.0, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
        [130.81, 196.0, 261.63, 329.63], // C/E
        [146.83, 220.0, 261.63, 293.66], // Dm9
        [116.54, 174.61, 233.08, 293.66], // Bb
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!this.ctx || !this.masterGain || !this.isPlaying) return;

        const now = this.ctx.currentTime;
        const currentChord = chords[chordIndex];
        chordIndex = (chordIndex + 1) % chords.length;

        currentChord.forEach((freq, i) => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = i === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, now);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(450, now);

          // Soft ambient fade-in and long tail fade-out
          const noteStart = now + i * 0.15;
          noteGain.gain.setValueAtTime(0.001, noteStart);
          noteGain.gain.linearRampToValueAtTime(0.04, noteStart + 1.2);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 5.5);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(this.masterGain);

          osc.start(noteStart);
          osc.stop(noteStart + 5.8);
        });
      };

      // Play initial chord and loop every 4.8 seconds
      playChord();
      this.intervalId = setInterval(playChord, 4800);
    } catch (e) {
      console.warn("Ambient music not supported:", e);
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          this.ctx?.close();
          this.ctx = null;
          this.masterGain = null;
        }, 1300);
      } catch {
        this.ctx = null;
        this.masterGain = null;
      }
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const ambientMusic = new AmbientMusicEngine();
