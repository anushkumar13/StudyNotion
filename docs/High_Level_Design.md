
# StudyNotion – High Level Design (HLD)

This document describes the High Level Design of **StudyNotion**, an ed-tech platform built using the MERN stack with additional infrastructure for scalability, reliability, and real-time features.

---

## 1. System Overview

StudyNotion is designed as a modern e-learning platform where **students** and **instructors** interact.  
Core features:

* Course creation and enrollment  
* Video and media delivery  
* Real-time notifications and chats  
* Secure payments  
* Scalable backend with caching, message queues, and worker services  

---

## 2. Architecture Diagram

You can view the full **High Level Design Diagram** here:  
👉 [View HLD on draw.io](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&target=blank&highlight=0000ff&edit=_blank&layers=1&nav=1&dark=1#R%3Cmxfile%3E%3Cdiagram%20name%3D%22StudyNotion%20System%20Architecture%22%20id%3D%22jbqhxlXs7EjSR45jzeJA%22%3E7Vxbd6M4Ev41Psd5cA7iZnhMnL7MmaQ3HWe3e%2FZNBsWmgxEj5MSeXz8SCDACx9ixMNmdlxhKQparvrqqyMCYLNdfCIwXd9hH4UDX%2FPXAuBnoOnBcXWOfnLQRJMN1BGlOAl8QS8I0%2BAsJYj5tFfgoqUykGIc0iKtED0cR8miFBgnBr9VpTzisfmsM56hGmHowrFN%2FBD5dCKqtaeXAVxTMF%2FlX6%2FnIEuazBSFZQB%2B%2FbpGMTwNjQjCm2dVyPUEhZ2DOmOy5zztGi50RFNE2D8zpV7z8%2Ffevz49ffn2PHv%2F7%2FNP9ORKrvMBwJX7xQLdDtt71E2bLsl3TjeCF%2FecK5wOjJJXUFZsw1mMm8OtynF3N%2Bee%2FE0QSNmF4zcWAyEW%2BMttitng2Lyf7wYtMevceRmxwSlc%2BYxHfCmeOrv0WJZSsPIr59t7cEiNXdqVXNqMTvIp8xNkL2PDrIqBoGkOPj74yjWC0BV2GYrgurpz3iFC03iIJ8X1BeIko2bApYtQ0BZSEOo2MsSC8lth0LUFbbMFSdwURCn2YF4uXiGEXAjQHAEhXB6AhG5yEeOU%2FMaYV0kspn0m2OMOUxmXsQW%2BBkvTbIA28dPI13%2FqS6eduKUvyZBoa88sFWsM5jtiUGJGA8QmRknqfk%2FT9Mn8K1ig3aifCAKhCwDLqCAAOaIAAUAYBQx0EJjffCsH%2FuPrcVpCMl7QqCRgGcybQG49xnkvzmnM8YHb%2BSgwsA9%2FnjzeKtFR07TRStMdVMZpOXYwWsC91qy5IQ5UcLXVyvMXQZ%2BNMDDDyGP9LUzwnKEm9xNXt9dk8xPSW%2FcVPT2G6zUkqXSYGXWOCp0E0f5%2Bb%2BAhmRbetCiCB0WRYDK3BsBimKkDa6gB5Fcds%2BDFIsTj8xkLXy18chvfYT84Bw3yhGWkAV5e6YKSY0DXOEvaR8YlF1xQGETo4YFK710%2FrOLceAbPPaybCfbLrdoOcbwSHYcq4z6nVmwirgiqUzPu8Mg2ukJnxCTPCET%2BqdfCqdRK8jpiXq9oY3WoIX8G4KXixLVU2ZqzOxvxAsyn2nhEt3N0Dgix1XXLFuoUbbnsO1fEkhlGbTRn2MYYmW%2F2cGpOkDLsMMNeecJXQrWAhZra5V%2BpNkB9w6wN9GGcbHcarWbHfZDU71BydWUd1U6%2FGpbqdxwXbKmpbDWGppalSUUedij4ICWZy2yu0HYGdtwm5%2FyHGfiHNMonezgoC9J7nqZz%2FtaJsmTymS0R4Z51Iso4rZRzArBvfRttr2qoE66oX7IQXBgqNnLJoIQlwpC62Os7unt%2BU8QJKmuhoTwT9uWJACzcjgng61JNd4tkv5KVVvOEC0zS4WpGEyxZR7%2FKdhvYDafIIuHZVlQ3XbYijCv3e1uWxo0qXc8uhQpnvmNryOr2ufV%2BhVanOjzB5Lomdp0u8PvkAZ7OA3n0fpLXIblXlo9qaUlHYzS88S3X6FZNnliadSI%2BZhkGWdoV4TuByUC24VMbuy4EzVF2YLktu2bIaKoHloVJFl5UVdIHCU6EfqZwHWaXln%2FxH1o2YYC8raSwQfOFQoczInSzt2cm%2BUidHHg4xybZKCYySHOHXqc8txkKOxJEPyfOQzGdDUbHIPy5EpYON6Dxb4DfbFxcXb0rnJLxESxhwrCcoElVdulgtZ1FGnaN9YWBLQJy7rgJco2pDxnpTXUUbd1pXAQoPBv8T%2BIgXCB45PD3sb9UIcvPS%2FwJu16UKyM0ti%2B7xsmXI1DOcA006%2FR4bZr02MW46%2FVZXmgAKzz7vcDTHN9zqPqA4DDw45ZVEGy45b6NZEu%2FH2P9hcLnKuk4mRYIobphjFUeNk11MfKdzrCWsxC%2B2QiA%2FRtx24zs8yzm9u1JnnB7Q8E6u9JtpOMQ0vsjltIyzbECBO%2F5Imb0O3OoJiVN0clTKr01VumLm6W2cudPGqVDitL8niGDKmeES%2BQFkF5Obb%2Brz690qcJa04%2FzGNG%2BfqsTO4v6FB2HvbKD7SMpZK7uxgKQpV2%2BuuynrkQAKmyQe4F%2BYxHBTRNdTSoL4HKW2I1R3uGebByx1DzfLrIP0VCu2sGUfoB91BMbSeSEA44ZjJbspKC96V0%2BvEgrP9OXY8S4rJtwTzO3hORLP4RRF%2FhfeTV9o6adpeX33eH%2ByQ%2BhuUGU4NUw12tmmKEhdnzPYfQqtQqoPkKLbYBmItgKKn3m5SputeHvExa4MphdBA8u0qDipu7r%2F7WQt9t1UGWqNuaCxD9LutMqgN1UZJEYxI3DF33fh0VQIkyTwqrypMhKtA%2FqTX19a4u4PMY9f36y3pt1sxE1CCUNh%2FhaM%2FmYndMJSbw%2B9pU7ZPORXXr%2Bpi2W7H7qR5xmNoJBl2C%2BosokmOYhvuMdBinQhdUcO7eSWh%2Bz3iKdKadYWciV%2FaMpxH4VkjmhtoRQWxc9%2BB1KacrXOkcLQQDZbD%2FHbP7bHysfSOyUIEz88Y%2Fgb86x%2BIVGyP0WAdSgSnbHU0K13DcWm1wl2QzHCPHN7A4c7MAVOiKkPhhUXSCJ25ZC6tdmS3ioCjuzLVIOlKYs9HiyHCL0nwhwBQ2oFAK7crNNWnEaxqWIp2aGplmdTCvY%2BP9SBT9mr%2F%2Fb%2FLGRGpX%2FIW3912fWoxkxTO2gbzCRsY%2FTdIU0RxagPfse9gpFRJC6F5OUsur3hMZ3zGp48W%2BsliPjNVsPZ6YHl9AtYumlfVkMUwzk2RGlaDOQvJ3QFrqa%2BuLN4tfROhtLZk3q7pRt1ewXTETA1XYZWLVtq70hNbVxDvdxmpRqoTcXKf4Baa3Ddi9S8v6c3UDVMGVxj93io1ldzaieVqqF6bNTXX6gqd%2FM5KvfD1%2BwZfE2p0ODacqHhADsrFy00s%2BOqhXlssHl67PYSpmZbmPYtr5Yzoq1j7cNxWltMtzq2seaxceuxSRHYAmEJyX2HBRXAl%2FhvX9jxYbIoDqrfgdu2cSzoVyI%2FMgwZaeDYdGuky6fw%2FC2kblF77FlWn1Hb0uieCMluWyD3q3AgH6KCY6uaQDesPUupBnFvCuEnSrpOZWO1ttDs3TGN1Ctg1874D8i%2FrFo2V6u9qgZof0oFCgDaZG47MKdavzDrSMeBFjgask6tYmC5HSPWUleFBYODnfnPres2gYNCk6p%2FTJMqvfMytuU3WVp3MVRR7ljyQkcDk92W%2F6c5m17%2Bx2vj098%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E)

---

## 3. Architecture Components

### a. Users
* Access via web browsers (students and instructors).  
* Interact with the frontend React app and WebSocket layer.  

### b. CDN / WAF
* Cloudflare / CloudFront used for caching static assets (JS, CSS, images).  
* Adds protection (rate limiting, DDoS mitigation).  

### c. Load Balancer / Ingress
* Application Load Balancer handles SSL termination and path-based routing.  
* Directs traffic to app servers or WebSocket servers.  

### d. Application Tier (Node.js Pods)
* Runs Express.js backend (controllers, routes, middlewares, utils).  
* Stateless containers, horizontally scalable.  
* Responsible for REST APIs, authentication, and core business logic.  

### e. WebSocket / Real-Time Layer
* Socket.io cluster managed in separate pods.  
* Uses **Redis pub/sub adapter** for broadcasting events across multiple socket servers.  
* Powers features like live class notifications, chat, and collaborative tools.  

### f. Redis
* Used for:  
  * Session management  
  * Caching hot data (popular courses, user sessions)  
  * Pub/sub for WebSocket communication  
* Rate Limiter (token bucket) integrated with Redis to protect APIs from abuse.  

### g. Message Queue
* **RabbitMQ** is used to manage background jobs.  
* Tasks include:  
  * Email sending  
  * Video processing  
  * Thumbnail generation  
  * Notification dispatch  

### h. Worker Pods
* Consume jobs from RabbitMQ asynchronously.  
* Heavy processes like video transcoding, image optimization run here.  
* Keeps API layer fast and responsive.  

### i. Database
* MongoDB ReplicaSet for persistence.  
* Stores users, courses, enrollments, ratings, orders, etc.  
* Uses indexes (TTL for OTPs, compound indexes for queries).  

### j. Media Storage
* **Cloudinary** for video and image storage + CDN delivery.  
* Signed uploads for secure media management.  

### k. Third-Party Integrations
* **Payments:** Razorpay / Stripe for handling transactions, refunds, subscriptions.  
* **Mail Service:** SendGrid / SES / SMTP for notifications, OTPs, transactional emails.  

---

## 4. Data Flow (Simplified)

1. User requests pass through **CDN/WAF → Load Balancer → App Tier**.  
2. App Tier interacts with **Redis cache**, **MongoDB**, and **RabbitMQ**.  
3. WebSocket layer handles live events, scaling via Redis pub/sub.  
4. Media uploads go directly to **Cloudinary** with signed URLs.  
5. Payment and mail services are integrated via webhooks and APIs.  
6. Background jobs run in Worker Pods, keeping the main app lightweight.  

---

## 5. Challenges Faced During Design

* Choosing between **monolith vs microservices**. Finalized on modular monolith with scalable pods.  
* Redis integration was tricky to balance between caching and pub/sub without over-complicating the setup.  
* Ensuring real-time features (chat/notifications) scale horizontally without bottlenecks.  
* Diagram readability — managing too many components without clutter.  
* Payment and email services integration with retries and webhook reliability.  

---

## 6. Next Steps

* Move towards **Low Level Design (LLD)** with detailed API contracts and DB schema.  
* Implement CI/CD pipelines and Dockerized deployments.  
* Plan for future scaling using Kubernetes.  

---
