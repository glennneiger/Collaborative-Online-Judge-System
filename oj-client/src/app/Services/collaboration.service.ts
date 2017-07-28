import { Injectable } from '@angular/core';

declare const io: any;
@Injectable()
export class CollaborationService {
  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, { query: `sessionId=${ sessionId }` });

    this.collaborationSocket.on('change', (delta: string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta); // convert string to object to apply
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });
  }

  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }

}
