import { Injectable } from '@nestjs/common';

@Injectable()
export class JokesService {
  private jokes: string[] = [
    "How many developers does it take to change a light bulb? None, it's a hardware issue.",
    '() => new Promise((resent, rejoice) => ...)',
    'This joke is like UDP, you might not get it.',
    'What do you call a developer that uses light mode? A junior developer.',
  ];

  randomJoke() {
    const randomIndex = Math.floor(Math.random() * this.jokes.length);
    return this.jokes[randomIndex];
  }
}
