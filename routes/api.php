<?php


use App\Controllers\UserController;
use App\Controllers\OperationController;
use App\Controllers\GoalController;
use App\Controllers\BudgetController;
use App\Controllers\FilterController;



// ROUTES API (NO VIEW)

// POST email and password for login 
$router->post('/api/auth/login', [UserController::class, 'login']);
// POST personal info for registration
$router->post('/api/auth/register', [UserController::class, 'registration']);




// ROUTES TRANSACTIONS
$router->post('/api/operations', [OperationController::class, 'insert']);
//pass token into headers
$router->get('/api/operations', [OperationController::class, 'showAll']);
$router->get('/api/monthOperations', [OperationController::class, 'monthsOperations']);
$router->get('/api/allExpense', [OperationController::class, 'expenses']);




//$router->delete('/api/operations/{id}', [OperationController::class, 'delete']);


//CATEGORIES
$router->get('/api/categories', [OperationController::class, 'categories']);





//GOALS
$router->get('/api/goals', [GoalController::class, 'showAll']);
$router->post('/api/goals', [GoalController::class, 'insert']);
//send id and new value to change it and add new transation 
$router->post('/api/goals/transation', [GoalController::class, 'updateGoal']);
//$router->delete('/api/goals/{id}', [GoalController::class, 'delete']);



//BUDGETS
$router->post('/api/budgets', [BudgetController::class, 'insert']);
$router->get('/api/budgets', [BudgetController::class, 'showAll']);
$router->get('/api/bugetSummary', [BudgetController::class, 'bugetSummary']);
//$router->delete('/api/budgets/{id}', [BudgetController::class, 'delete']);


//GENERIC FILTERS
$router->post('/api/filters', [FilterController::class, 'filters']);
$router->post('/api/filters/delete', [FilterController::class, 'delete']);

/*

// AUTH
$router->post('/api/auth/register', [AuthController::class, 'register']);
$router->post('/api/auth/login', [AuthController::class, 'login']);
$router->post('/api/auth/logout', [AuthController::class, 'logout']);
$router->get('/api/auth/me', [AuthController::class, 'me']);

// TRANSACTIONS
$router->get('/api/transactions', [TransactionController::class, 'index']);
$router->post('/api/transactions', [TransactionController::class, 'store']);
$router->put('/api/transactions/{id}', [TransactionController::class, 'update']);
$router->delete('/api/transactions/{id}', [TransactionController::class, 'delete']);

// BUDGET
$router->get('/api/budget', [BudgetController::class, 'show']);
$router->post('/api/budget', [BudgetController::class, 'store']);
$router->put('/api/budget/{id}', [BudgetController::class, 'update']);

// GOALS
$router->get('/api/goals', [GoalController::class, 'index']);
$router->post('/api/goals', [GoalController::class, 'store']);
$router->put('/api/goals/{id}', [GoalController::class, 'update']);
$router->delete('/api/goals/{id}', [GoalController::class, 'delete']);*/



//ROUTES GOALS/BUDGETS

// GET user id 
//$router->get('/api/users/{id}', [UserController::class, 'showId']);


//POST new item 
//$router->post('/api/item/new', [ItemController::class, 'new']);

//$router->post('/api/item/all', [ItemController::class, 'all']);
