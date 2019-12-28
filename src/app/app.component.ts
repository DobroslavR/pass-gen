import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "password-generator";

  constructor(private _snackBar: MatSnackBar) {}

  private snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: "center",
    duration: 1500,
    verticalPosition: "top"
  };

  public passLength = 16;
  public includeSymbols = true;
  public includeNumbers = true;
  public includeLowercase = true;
  public includeUppercase = true;

  private CHAR_MIN_ASCII = 97;
  private CHAR_MAX_ASCII = 122;
  private SYMB_MIN_ASCII = 33;
  private SYMB_MAX_ASCII = 47;
  public lowercaseChars = [];
  public uppercaseChars = [];
  public symbolChars = [];
  private numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  public generatedPassword = "";

  private getCharValues() {
    for (
      let index = this.CHAR_MIN_ASCII;
      index <= this.CHAR_MAX_ASCII;
      index++
    ) {
      this.lowercaseChars.push(String.fromCharCode(index));
      this.uppercaseChars.push(String.fromCharCode(index).toUpperCase());
    }
    for (
      let index = this.SYMB_MIN_ASCII;
      index <= this.SYMB_MAX_ASCII;
      index++
    ) {
      this.symbolChars.push(String.fromCharCode(index));
    }
  }

  public copyToClipboard() {
    if (!this.generatedPassword) {
      this._snackBar.open(
        "Generate password first!",
        "Close",
        this.snackBarConfig
      );
    } else {
      const el = document.createElement("textarea");
      el.value = this.generatedPassword;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this._snackBar.open("Copied to clipboard", "Close", this.snackBarConfig);
    }
  }

  private getRandomCharList(arr: any[]): any[] {
    const rndPosition = Math.floor(Math.random() * arr.length);
    return arr[rndPosition];
  }

  public generatePassword() {
    if (!this.passLength) {
      this._snackBar.open(
        "Choose password length!",
        "Close",
        this.snackBarConfig
      );
      return;
    }
    const tempPassArr = [];
    const chars = [];
    if (this.includeLowercase) {
      chars.push(this.lowercaseChars);
    }
    if (this.includeUppercase) {
      chars.push(this.uppercaseChars);
    }
    if (this.includeSymbols) {
      chars.push(this.symbolChars);
    }
    if (this.includeNumbers) {
      chars.push(this.numbers);
    }
    if (!chars.length) {
      this._snackBar.open(
        "Select atleast one option!",
        "Close",
        this.snackBarConfig
      );
    } else {
      for (let index = 0; index < this.passLength; index++) {
        const charList = this.getRandomCharList(chars);
        const rndCharPosition = Math.floor(Math.random() * charList.length + 1);
        tempPassArr.push(charList[rndCharPosition]);
      }
      this.generatedPassword = tempPassArr.join("");
    }
  }

  ngOnInit() {
    this.getCharValues();
  }
}
