import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

type transaction = {
  id: number;
  delay: boolean;
  commited: boolean;

  steps: Array<dataManipulation>;
};

type dataManipulation = {
  what: "r" | "w" | "c";
  variable?: string;
}

type history = {
  step: Array<Record<number, dataManipulation>>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCheckboxModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scheduler-simm-2pl';

  initialHistory : history = { step: [] };

  transactions: Array<transaction> = [
     {
      id: 1,
      delay: false,
      commited: false,
      steps: [
        { variable: "x", what: 'w' },
        { variable: "y", what: 'w' },
        { what: 'c' },
      ]
    },  
    {
      id: 2,
      delay: false,
      commited: false,
      steps: [
        { variable: "x", what: 'r' },
        { variable: "x", what: 'w' },
        { what: 'c' },
      ]
    },  
    {
      id: 3,
      delay: false,
      commited: false,
      steps: [
        { variable: "y", what: 'r' },
        { variable: "y", what: 'r' },
        { what: 'c' },
      ]
    },
    {
      id: 4,
      delay: false,
      commited: false,
      steps: [
        { variable: "y", what: 'w' },
        { variable: "x", what: 'r' },
        { what: 'c' },
      ]
    }
  ]

  
  transactions2: Array<transaction> = [
    {
     id: 1,
     delay: false,
     commited: false,
     steps: [
       { variable: "x", what: 'w' },
       { variable: "y", what: 'w' },
       { what: 'c' },
     ]
   },  
   {
     id: 2,
     delay: false,
     commited: false,
     steps: [
       { variable: "x", what: 'r' },
       { variable: "x", what: 'w' },
       { what: 'c' },
     ]
   }, 
  ]

  buildHistory(transactions: Array<transaction>) {   
    let i = -1
    let timesIterate = 0
    const maxI = transactions.length - 1
    const maxSteps = transactions.reduce((sum, t) => sum + t.steps.length, 0);

    do{
      i < maxI ? i++ : i = 0;
      
      const step = transactions[i].steps.shift()

      if (step){

        this.initialHistory.step.push({[transactions[i].id]: step});

        if (transactions[i].steps.length === 1){
          const commit = transactions[i].steps.shift()
          if (commit){
            this.initialHistory.step.push({[transactions[i].id]: commit});
            timesIterate++;
          }
        }

      }else{
        continue;
      }       

      timesIterate++;           

    }while(timesIterate < maxSteps);

    console.log(this.initialHistory);
    
  }
  
}
