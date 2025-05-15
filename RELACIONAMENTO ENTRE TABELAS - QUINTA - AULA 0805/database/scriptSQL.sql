#Cria um novo database
create database db_controle_filmes_professor;

#Ativa o database a ser utilizado
use db_controle_filmes_professor;

create table tbl_classificacao (
	id 				int not null primary key auto_increment,
    sigla			varchar(2) not null,
    nome 			varchar(80) not null,
    descricao		varchar(200) not null
);

create table tbl_genero (
	id 				int not null primary key auto_increment,
    nome 			varchar(80) not null
);

create table tbl_filme_genero (
	id 				int not null primary key auto_increment,
    id_filme		int not null,
    id_genero 		int	not null,
	constraint FK_FILME_FILME_GENERO
    foreign key (id_filme) 
    references tbl_filme(id),
    
    constraint FK_GENERO_FILME_GENERO
    foreign key (id_genero) 
    references tbl_genero(id)
);

#Criação da tabela de filme
create table tbl_filme (
	id 				int not null primary key auto_increment,
    nome 			varchar(80) not null,
    duracao 		time not null,
    sinopse			text not null,
    data_lancamento	date not null,
    foto_capa		varchar(200),
    link_trailer	varchar(200),
    id_classificacao int not null,
    constraint FK_CLASSIFICACAO_FILME
    foreign key (id_classificacao) 
    references tbl_classificacao(id)
    
);

insert into tbl_classificacao (sigla, nome, descricao) values ('IF', 'Infantil', 'Livre para crianças');
insert into tbl_genero (nome) values ('Terror');
insert into tbl_filme_genero (id_filme, id_genero) values (1, 1);
insert into tbl_filme_genero (id_filme, id_genero) values (1, 2);
insert into tbl_filme_genero (id_filme, id_genero) values (2, 2);


show tables;

desc tbl_filme;

select * from tbl_filme;
select * from tbl_classificacao;