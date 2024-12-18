resource "aws_db_instance" "main" {
  identifier           = var.identifier
  allocated_storage    = 20
  storage_type         = "gp2"
  engine              = "postgres"
  engine_version      = "14"
  instance_class      = var.instance_class
  db_name             = "ecommerce"
  username            = "admin"
  password            = random_password.db_password.result
  skip_final_snapshot = true

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name

  tags = {
    Environment = var.environment
  }
}

resource "random_password" "db_password" {
  length  = 16
  special = true
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.identifier}-subnet-group"
  subnet_ids = var.subnet_ids

  tags = {
    Environment = var.environment
  }
}