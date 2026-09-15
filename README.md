# Collaborative Task Board

A real-time, multi-user task/board application (mini-Trello) built to demonstrate full-stack skills: Angular, .NET microservices, Docker, Redis, SignalR, and Azure messaging/deployment.

## Tech Stack
- **Frontend:** Angular 20 (standalone components)
- **Backend:** .NET 8 Web API — split into `TaskService` and `NotificationService` microservices, sharing a `TaskBoard.Contracts` library
- **Auth:** JWT / Azure AD
- **Cache:** Redis
- **Real-time:** SignalR
- **Messaging:** Azure Service Bus (or RabbitMQ locally)
- **Database:** Azure SQL
- **Deployment:** Docker, Azure App Service / Container Apps

## Repo Structure