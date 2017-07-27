import { Component, OnInit } from '@angular/core';

declare const ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor: any;
  language: string = 'Java';
  languages: string[] = ['Java', 'Python', 'JavaScript'];
  defaultContent = {
'Java': `public class Solution {
  public static void main(String[] args) {
    // Type your Java Code here
  }
}`,
'Python': `class Solution:
  def solution(): 
    # Write your Python Code here
`,
'JavaScript': `class Solution {
  // Type your JavaScript Code here
}`
  }
  
  constructor() { }

  ngOnInit() {
    this.initEditor();
  }

  initEditor(): void {
    this.editor = ace.edit("editor")
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
  }

  resetEditor(): void {
    this.editor.getSession().setMode(`ace/mode/${this.language.toLocaleLowerCase()}`);
    this.editor.setValue(this.defaultContent[this.language]);
  }  

}
