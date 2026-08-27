--
-- PostgreSQL database dump
--

\restrict lGQsE5JWQsjsMpMAT06RloYcUf2vwJMJPZdyWmZipImSmgidPoRzXrqWpuD9NCg

-- Dumped from database version 16.14 (Homebrew)
-- Dumped by pg_dump version 16.14 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: application_status; Type: TYPE; Schema: public; Owner: andreijuguleanu
--

CREATE TYPE public.application_status AS ENUM (
    'applied',
    'interviewing',
    'offer',
    'rejected'
);


ALTER TYPE public.application_status OWNER TO andreijuguleanu;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: andreijuguleanu
--

CREATE TABLE public.applications (
    id integer NOT NULL,
    company_id integer NOT NULL,
    role character varying,
    status public.application_status NOT NULL,
    date_applied timestamp without time zone
);


ALTER TABLE public.applications OWNER TO andreijuguleanu;

--
-- Name: applications_id_seq; Type: SEQUENCE; Schema: public; Owner: andreijuguleanu
--

CREATE SEQUENCE public.applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.applications_id_seq OWNER TO andreijuguleanu;

--
-- Name: applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andreijuguleanu
--

ALTER SEQUENCE public.applications_id_seq OWNED BY public.applications.id;


--
-- Name: companies; Type: TABLE; Schema: public; Owner: andreijuguleanu
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying,
    industry character varying,
    website character varying
);


ALTER TABLE public.companies OWNER TO andreijuguleanu;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: andreijuguleanu
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.companies_id_seq OWNER TO andreijuguleanu;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andreijuguleanu
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: interviews; Type: TABLE; Schema: public; Owner: andreijuguleanu
--

CREATE TABLE public.interviews (
    id integer NOT NULL,
    application_id integer,
    round integer,
    notes character varying,
    date timestamp without time zone
);


ALTER TABLE public.interviews OWNER TO andreijuguleanu;

--
-- Name: interviews_id_seq; Type: SEQUENCE; Schema: public; Owner: andreijuguleanu
--

CREATE SEQUENCE public.interviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.interviews_id_seq OWNER TO andreijuguleanu;

--
-- Name: interviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: andreijuguleanu
--

ALTER SEQUENCE public.interviews_id_seq OWNED BY public.interviews.id;


--
-- Name: applications id; Type: DEFAULT; Schema: public; Owner: andreijuguleanu
--

ALTER TABLE ONLY public.applications ALTER COLUMN id SET DEFAULT nextval('public.applications_id_seq'::regclass);


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: andreijuguleanu
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: interviews id; Type: DEFAULT; Schema: public; Owner: andreijuguleanu
--

ALTER TABLE ONLY public.interviews ALTER COLUMN id SET DEFAULT nextval('public.interviews_id_seq'::regclass);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: andreijuguleanu
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: andreijuguleanu
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: interviews interviews_pkey; Type: CONSTRAINT; Schema: public; Owner: andreijuguleanu
--

ALTER TABLE ONLY public.interviews
    ADD CONSTRAINT interviews_pkey PRIMARY KEY (id);


--
-- Name: applications applications_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andreijuguleanu
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.companies(id);


--
-- Name: interviews interviews_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: andreijuguleanu
--

ALTER TABLE ONLY public.interviews
    ADD CONSTRAINT interviews_application_id_fkey FOREIGN KEY (application_id) REFERENCES public.applications(id);


--
-- PostgreSQL database dump complete
--

\unrestrict lGQsE5JWQsjsMpMAT06RloYcUf2vwJMJPZdyWmZipImSmgidPoRzXrqWpuD9NCg

