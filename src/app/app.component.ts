import { Component } from '@angular/core';

interface Task{
  id:number;
  title:string;
  description:string;
  dueDate:Date;
  status:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-manager';
  tasks:Task[]=[];
  newTask:Task={
    id:0,
  title:'',
  description:'',
  dueDate:new Date(),
  status:'Pending'
  }
  isEditing:Boolean=false;
  editingtaskID:number | null=null;

  addTask(){
    if(this.isEditing && this.editingtaskID !== null)
      {
        const index=this.tasks.findIndex(task => task.id === this.editingtaskID);
        if(index!==-1)
          {
            this.tasks[index]={...this.newTask};
            this.isEditing=false;
            this.editingtaskID=null;
          }
      }
      else{
        this.newTask.id=Date.now();
        this.tasks.push({...this.newTask});
      }
      this.resetForm();
  }

  editTask(task:Task){
    this.isEditing=true;
    this.editingtaskID=task.id;
    this.newTask={...task};
  }

  deleteTask(id:number){
    this.tasks=this.tasks.filter(task => task.id !==id);
  }

  resetForm(){
    this.newTask={
      id:0,
      title:'',
      description:'',
      dueDate:new Date(),
      status:'Pending'  
    };
  }
}
