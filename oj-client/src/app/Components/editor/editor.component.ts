import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CollaborationService } from 'app/Services/collaboration.service';

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
  sessionId: string;
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
  };
  
  constructor(
    private collaboration: CollaborationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.initEditor();
    });
  }

  initEditor(): void {
    this.editor = ace.edit("editor")
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    // set mouse focus in ace editor
    document.getElementsByTagName('textarea')[0].focus();

    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    // register change callback
    this.editor.on('change', e => {
      // e is an object, use JSON.stringfy to serialize it
      console.log('editor changed: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    })

    // cursor movement
    this.editor.getSession().getSelection().on('changeCursor', () => {
      const cursor = this.editor.getSession().getSelection().getCursor();
      console.log('cursor move', JSON.stringify(cursor));
      this.collaboration.cursorMove(JSON.stringify(cursor));
    });
  }

  resetEditor(): void {
    this.editor.getSession().setMode(`ace/mode/${this.language.toLowerCase()}`);
    this.editor.setValue(this.defaultContent[this.language]);
  }  

  submit(): void {
    const userCodes = this.editor.getValue();
    console.log(userCodes);
  }


}
