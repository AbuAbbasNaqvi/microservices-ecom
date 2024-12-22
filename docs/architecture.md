# E-commerce System Architecture

```mermaid
graph TB
    subgraph "Frontend Application"
        UI[React UI]
        Cart[Cart Context]
        Products[Product Components]
        Request[Request Form]
    end

    subgraph "Microservices"
        CS[Cart Service]
        PS[Payment Service]
        RS[Request Service]
    end

    subgraph "Data Storage"
        Redis[(Redis Cache)]
        PostgreSQL[(PostgreSQL)]
    end

    subgraph "Infrastructure"
        EKS[AWS EKS]
        VPC[AWS VPC]
    end

    subgraph "CI/CD Pipeline"
        Jenkins[Jenkins]
        Docker[Docker Registry]
        ArgoCD[ArgoCD]
    end

    subgraph "Monitoring"
        Prometheus[Prometheus]
        Grafana[Grafana]
    end

    %% Frontend Flow
    UI --> Cart
    UI --> Products
    UI --> Request

    %% Service Connections
    Cart --> CS
    Products --> PS
    Request --> RS

    %% Data Storage Connections
    CS --> Redis
    PS --> PostgreSQL
    RS --> Redis
    RS --> PostgreSQL

    %% Infrastructure
    CS --> EKS
    PS --> EKS
    RS --> EKS
    EKS --> VPC

    %% CI/CD Flow
    Jenkins --> Docker
    Docker --> ArgoCD
    ArgoCD --> EKS

    %% Monitoring Flow
    EKS --> Prometheus
    Prometheus --> Grafana

    classDef service fill:#f9f,stroke:#333,stroke-width:2px
    classDef storage fill:#ff9,stroke:#333,stroke-width:2px
    classDef infra fill:#9ff,stroke:#333,stroke-width:2px
    classDef monitoring fill:#f99,stroke:#333,stroke-width:2px

    class CS,PS,RS service
    class Redis,PostgreSQL storage
    class EKS,VPC infra
    class Prometheus,Grafana monitoring
```

## Component Descriptions

1. **Frontend Application**
   - React UI with TypeScript
   - Cart state management using Context API
   - Product catalog and Request form components

2. **Microservices**
   - Cart Service: Manages shopping cart operations
   - Payment Service: Handles payment processing
   - Request Service: Processes product requests

3. **Data Storage**
   - Redis: Caching and session management
   - PostgreSQL: Primary database for orders and products

4. **Infrastructure**
   - AWS EKS: Kubernetes cluster management
   - VPC: Network isolation and security

5. **CI/CD Pipeline**
   - Jenkins: Automated build and deployment
   - Docker Registry: Container image storage
   - ArgoCD: Kubernetes deployment management

6. **Monitoring**
   - Prometheus: Metrics collection
   - Grafana: Visualization and alerting

## Data Flow

1. **User Interactions**
   - Users interact with the React frontend
   - Cart state is managed locally and synced with Cart Service
   - Product requests are sent to Request Service

2. **Service Operations**
   - Cart Service uses Redis for temporary storage
   - Payment Service connects to PostgreSQL for order processing
   - Request Service uses both Redis and PostgreSQL

3. **Deployment Flow**
   - Code changes trigger Jenkins pipeline
   - Docker images are built and pushed to registry
   - ArgoCD deploys to Kubernetes cluster

4. **Monitoring Flow**
   - Services expose metrics endpoints
   - Prometheus scrapes metrics
   - Grafana displays dashboards and alerts