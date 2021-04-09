<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


 
class TasksController extends Controller
{
   protected $tasks;

   public function __construct(Tasks $tasks)
   {
      $this->middleware('auth');
      $this->tasks = $tasks;
   }
   
   /**
    * Create a new controller instance.
    *
    * @return void
    */


   public function index()
   {
      $tasks = $this->tasks->orderBy('id', 'desc')->get();

      return response()->json($tasks);
   }

   public function create(Request $request)
   {

      $task = $this->tasks->create($request->all());

      return response()->json($task);
   }

   public function show($id)
   {
      $task = $this->tasks->find($id);

      return response()->json($task);
   }

   public function update(Request $request, $id)
   {
      $task = $this->tasks->find($id);

      $task->title = $request->title;
      $task->subtitle = $request->subtitle;
      $task->action = $request->action;
      $task->completed = $request->completed;

      $response = $task->save();

      return response()->json($response);
   }

   public function destroy($id)
   {
      $task = $this->tasks->find($id);
      $task->delete();

      return response()->json('task removed successfully');
   }
}
