<?php


use App\Controllers\UserController;
use App\Controllers\OperationController;
use App\Controllers\GoalController;
use App\Controllers\BudgetController;
use App\Controllers\FilterController;



// ROUTES API
// POST email and password for login 
$router->post('/api/auth/login', [UserController::class, 'login']);
// POST personal info for registration
$router->post('/api/auth/register', [UserController::class, 'registration']);



// ROUTES TRANSACTIONS
//new oprations
$router->post('/api/operations', [OperationController::class, 'insert']);
//all oprations
$router->get('/api/operations', [OperationController::class, 'showAll']);
//opration for each month
$router->get('/api/monthOperations', [OperationController::class, 'monthsOperations']);
//all expenses or all entry
$router->get('/api/allExpense', [OperationController::class, 'expenses']);
//all opration's CATEGORIES
$router->get('/api/categories', [OperationController::class, 'categories']);
//get total entry
$router->get('/api/allEntry', [OperationController::class, 'allEntry']);



//GOALS
//get all goals
$router->get('/api/goals', [GoalController::class, 'showAll']);
//new goal
$router->post('/api/goals', [GoalController::class, 'insert']);
//send id and new value to change it and add new transation 
$router->post('/api/goals/transation', [GoalController::class, 'updateGoal']);



//BUDGETS
//new buget
$router->post('/api/budgets', [BudgetController::class, 'insert']);
//get all budegets
$router->get('/api/budgets', [BudgetController::class, 'showAll']);
//percentage of buget that you already used 
$router->get('/api/bugetSummary', [BudgetController::class, 'bugetSummary']);



//GENERIC FILTERS
//insert 
$router->post('/api/filters', [FilterController::class, 'filters']);
//delete
$router->post('/api/filters/delete', [FilterController::class, 'delete']);



