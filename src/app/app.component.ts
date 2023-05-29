import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import emojiRegex from 'emoji-regex';
import { EmojiSearch } from '@ctrl/ngx-emoji-mart';
import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('textElementRef', { static: false }) textElementRef?: ElementRef;
  @ViewChild('emojiContainer') emojiContainer!: ElementRef;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  messageWithEmojis: string | undefined;
  title = 'my-angular-project';

  emojiValue: any;
  relatedImg: any;
  emojiService: any;
  emojiSearch: any;
  emojiSearchList: any;
  emojiList: any;

  ngOnInit(): void {
    this.emojiValue = '';
    this.emojiService = new EmojiService();
    this.emojiSearch = new EmojiSearch(this.emojiService);
    this.emojiSearchList = this.emojiSearch;
    this.emojiList = this.emojiService;
    this.emojiList.emojis = this.emojiList.emojis.reduce((obj: any, emoji: any) => {
      obj[emoji.name] = emoji;
      return obj;
    }, {});

  }

  // emoji: any;

  setFocusToPointer(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    if (targetElement.classList.contains('my-target-element')) {
      this.renderer.selectRootElement(targetElement).focus();
    }
  }


  addEmoji(_emoji: any) {

    const div1 = document.createElement('img');
    const styless = this.emojiList.emojiSpriteStyles(_emoji.emoji.sheet, 'twitter'); // pass emoji sheet

    div1.style.display = 'inline-block';
    div1.style.verticalAlign = 'middle';
    // div1.setAttribute('unicode', _emoji.emoji.native);
    div1.style.marginLeft = '3px';
    div1.style.marginRight = '3px';
    div1.style.border = 'none';
    Object.assign(div1.style, styless);

    this.textElementRef?.nativeElement.appendChild(div1);
    div1.focus();

  }



  sendMessage() {
    const inputText = this.textElementRef?.nativeElement.innerHTML.trim();
    const messageContainer = document.getElementById('message_container');
    if (inputText) {
      const newMessage = document.createElement('div');
      newMessage.innerHTML = inputText;
      newMessage.style.backgroundColor = 'lightblue';
      newMessage.style.marginBottom = '10px';
      newMessage.style.padding = '5px';
      newMessage.style.border = 'none';

      messageContainer?.appendChild(newMessage);
      if (this.textElementRef?.nativeElement) {
        this.textElementRef.nativeElement.innerHTML = '';
      }
    }
  }


  receiveMessage(message: string) {

    let text: string = "Hello 👍 world 🇧🇫 hhhhhh 🇧🇴sssssss🇧🇫🇧🇴 😆 ";

    let updatedString: string = text;
    const regex = emojiRegex();

    for (const match of text.matchAll(regex)) {
      let emoji = match[0];

      let emojissss: any = Object.values(this.emojiList.emojis).find((e: any) => {
        if (e.native === emoji) {
          return true;
        } else {
          return false;
        }
      });

      let emojis = this.emojiSearchList.search(emojissss.shortName).map((e: any) => {
        return e
      });

      const styless = this.emojiList.emojiSpriteStyles(emojis[0].sheet, 'twitter'); // pass emoji sheet

      let img = `<img  style="display: inline-block; vertical-align: middle; width: 24px; height: 24px; background-image:${styless['background-image']}; background-size:${styless['background-size']}; background-position: ${styless['background-position']};">`;
      updatedString = updatedString.replace(emoji, img);
    }

    // console.log(updatedString);

    const messageContainer = document.getElementById('message_container');
    if (updatedString) {
      const newMessage = document.createElement('div');
      newMessage.innerHTML = updatedString;
      newMessage.style.backgroundColor = 'lightgreen';
      newMessage.style.marginBottom = '10px';
      newMessage.style.padding = '5px';
      newMessage.style.border = 'none';


      messageContainer?.appendChild(newMessage);
    }
  }
}
