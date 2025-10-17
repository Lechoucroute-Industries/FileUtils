export class VirtualFile {
  constructor(contents, filename) {
    this.contents = contents;
    this.filename = filename;
    this.blob = new Blob([contents], { type: 'text/plain' });
  }

  getUrl() {
    return URL.createObjectURL(this.blob);
  }

  getName() {
    return this.filename;
  }

  getContents() {
    return this.contents;
  }

  dnld() {
    const link = document.createElement('a');
    link.href = this.getUrl();
    link.download = this.getName();
    link.click();
    URL.revokeObjectURL(this.getUrl());
  }
}

//EXTRACT TEXT CONTENTS FROM A FILE

 export class ExtractTextContents {
  constructor(file) {
  this.file = file
  }
   async loadText() {
     this.text = await this.file.text()
   }

  
   getText() {
     return this.text
   }
  
}

//CREATE FILE INPUT

export class Fileinput {
  constructor(identifier) {
    this.identifier = identifier;
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.id = this.identifier;
    this.file = null;

    this.fileInput.onchange = (event) => {
      this.file = event.target.files[0];
      if (this._resolve) {
        this._resolve(this.file);
      }
    };
  }

  start() {
    this.fileInput.click();
    return new Promise((resolve) => {
      this._resolve = resolve;
    });
  }

  getFile() {
    return this.file;
  }
}



//SEARCH FOR HOW MANY TIMES A WORD/STRING APPEARS IN A FILE

export class ExactContentSearch {
  constructor(file, searchTerm, separators) {
    this.file = file;
    this.searchTerm = searchTerm;
    this.separators = separators;
    this.count = 0;  // default
  }

  async loadCount() {
    const text = await this.file.text();
    // Create regex to split by any of the separators
    const separatorsRegex = new RegExp(`[${this.separators}]`);
    const words = text.split(separatorsRegex);
    this.count = words.filter(word => word === this.searchTerm).length;
  }

  getCount() {
    return this.count;
  }
}


