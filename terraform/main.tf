terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
  backend "s3" {
    bucket = "ecommerce-terraform-state"
    key    = "state/terraform.tfstate"
    region = "us-west-2"
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "./modules/vpc"
  
  vpc_cidr           = var.vpc_cidr
  availability_zones = var.availability_zones
  environment        = var.environment
}

module "eks" {
  source = "./modules/eks"
  
  cluster_name    = var.cluster_name
  vpc_id         = module.vpc.vpc_id
  subnet_ids     = module.vpc.private_subnet_ids
  instance_types = var.eks_instance_types
  environment    = var.environment
}

module "rds" {
  source = "./modules/rds"
  
  identifier     = "ecommerce-${var.environment}"
  vpc_id         = module.vpc.vpc_id
  subnet_ids     = module.vpc.private_subnet_ids
  instance_class = var.rds_instance_class
  environment    = var.environment
}

module "elasticache" {
  source = "./modules/elasticache"
  
  cluster_id     = "ecommerce-${var.environment}"
  vpc_id         = module.vpc.vpc_id
  subnet_ids     = module.vpc.private_subnet_ids
  instance_type  = var.elasticache_instance_type
  environment    = var.environment
}