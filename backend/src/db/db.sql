CREATE TABLE "instituicao"(
    "id" BIGINT NOT NULL PRIMARY KEY,
    "nome" VARCHAR(255) NOT NULL
);

CREATE TABLE "localidade"(
    "id_localidade" SERIAL NOT NULL PRIMARY KEY,
    "nome_estado" VARCHAR(255) NOT NULL,
    "sigla_estado" VARCHAR(255) NOT NULL,
    "nome_cidade" VARCHAR(255) NOT NULL
);

CREATE TABLE "area_doutorado"(
    "id_doutorado" SERIAL NOT NULL PRIMARY KEY,
    "id_pesquisador" BIGINT NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "instituicao_id" BIGINT NOT NULL,
    FOREIGN KEY("instituicao_id") REFERENCES "instituicao"("id")
);

CREATE TABLE "pesquisador"(
    "id_pesquisador" SERIAL NOT NULL PRIMARY KEY,
    "nome" VARCHAR(255) NOT NULL,
    "link_lattes" VARCHAR(255) NOT NULL,
    "area_pesquisa" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "celular" VARCHAR(255) NOT NULL,
    "localidade" BIGINT NOT NULL,
    "pagina_institucional" VARCHAR(255) NULL,
    "pq" BOOLEAN NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "editor_revista" BOOLEAN NOT NULL,
    "revistas" VARCHAR(255) NULL,
    "laboratorio" VARCHAR(255) NOT NULL,
    "area_doutorado" BIGINT NOT NULL,
    FOREIGN KEY("localidade") REFERENCES "localidade"("id_localidade"),
    FOREIGN KEY("area_doutorado") REFERENCES "area_doutorado"("id_doutorado")
);

CREATE TABLE "grupo_pesquisa"(
    "id_grupo" SERIAL NOT NULL PRIMARY KEY,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "instituicao" BIGINT NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    FOREIGN KEY("instituicao") REFERENCES "instituicao"("id")
);

CREATE TABLE "revistas_editadas"(
    "id_revista" SERIAL NOT NULL PRIMARY KEY,
    "endereco" VARCHAR(255) NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "id_pesquisador" INTEGER NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador")
);

CREATE TABLE "area_de_pesquisa"(
    "id_area_pesquisa" SERIAL NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL,
    "id_pesquisador" INTEGER NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador")
);

CREATE TABLE "disciplinas"(
    "id_disciplina" SERIAL NOT NULL PRIMARY KEY,
    "descricao" TEXT NOT NULL,
    "id_pesquisador" INTEGER NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador")
);

CREATE TABLE "servico"(
    "id_servico" SERIAL NOT NULL PRIMARY KEY,
    "id_pesquisador" BIGINT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "area" BIGINT NOT NULL,
    "tipo" BIGINT NOT NULL,
    "localidade" BIGINT NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador"),
    FOREIGN KEY("localidade") REFERENCES "localidade"("id_localidade")
);

CREATE TABLE "vinculo"(
    "id_vinculo" SERIAL NOT NULL PRIMARY KEY,
    "id_pesquisador" BIGINT NOT NULL,
    "instituicao" BIGINT NOT NULL,
    "tipo" VARCHAR(255) CHECK ("tipo" IN('primaria', 'secundario', 'pos')) NOT NULL,
    "nome_programa" VARCHAR(255) NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador"),
    FOREIGN KEY("instituicao") REFERENCES "instituicao"("id")
);
COMMENT ON COLUMN "vinculo"."tipo" IS '(primaria, secundario, pos)';

CREATE TABLE "publicacao"(
    "id_publicacao" SERIAL NOT NULL PRIMARY KEY,
    "id_pesquisador" BIGINT NOT NULL,
    "doi" VARCHAR(255) NULL,
    "url" VARCHAR(255) NULL,
    "titulo" VARCHAR(255) NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador")
);

CREATE TABLE "equipamento"(
    "id_equipamento" SERIAL NOT NULL PRIMARY KEY,
    "id_pesquisador" BIGINT NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao_tecnica" VARCHAR(255) NOT NULL,
    "localidade" BIGINT NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador"),
    FOREIGN KEY("localidade") REFERENCES "localidade"("id_localidade")
);

CREATE TABLE "mensagem"(
    "id_mensagem" SERIAL NOT NULL PRIMARY KEY,
    "id_remetente" BIGINT NOT NULL,
    "is_global" BOOLEAN NOT NULL,
    "id_destinatario" BIGINT NULL,
    "conteudo" BIGINT NOT NULL,
    "data_envio" BIGINT NOT NULL,
    FOREIGN KEY("id_remetente") REFERENCES "pesquisador"("id_pesquisador"),
    FOREIGN KEY("id_destinatario") REFERENCES "pesquisador"("id_pesquisador")
);

CREATE TABLE "contribuicao"(
    "id_contribuicao" SERIAL NOT NULL PRIMARY KEY,
    "id_pesquisador" BIGINT NOT NULL,
    "valor" BIGINT NOT NULL,
    "data_pagamento" DATE NOT NULL,
    "metodo" VARCHAR(255) NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador")
);

CREATE TABLE "rede_social"(
    "id_rede" SERIAL NOT NULL PRIMARY KEY,
    "id_pesquisador" BIGINT NOT NULL,
    "plataforma" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador")
);

CREATE TABLE "membro_grupo"(
    "id_grupo" BIGINT NOT NULL,
    "id_pesquisador" BIGINT NOT NULL,
    PRIMARY KEY ("id_grupo", "id_pesquisador"),
    FOREIGN KEY("id_grupo") REFERENCES "grupo_pesquisa"("id_grupo"),
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador")
);

CREATE TABLE "pos_graduacao"(
    "id_pos" SERIAL NOT NULL PRIMARY KEY,
    "id_pesquisador" BIGINT NOT NULL,
    "id_instituicao" BIGINT NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador"),
    FOREIGN KEY("id_instituicao") REFERENCES "instituicao"("id")
);

CREATE TABLE "org_sociedades"(
    "id_sociedade" SERIAL NOT NULL PRIMARY KEY,
    "nome" VARCHAR(255) NOT NULL,
    "id_pesquisador" BIGINT NOT NULL,
    FOREIGN KEY("id_pesquisador") REFERENCES "pesquisador"("id_pesquisador")
);
