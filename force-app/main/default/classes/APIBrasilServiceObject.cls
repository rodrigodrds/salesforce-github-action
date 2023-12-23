public with sharing class APIBrasilServiceObject {
	public String cnpj;
	public Integer identificador_matriz_filial;
	public String descricao_matriz_filial;
	public String razao_social;
	public String nome_fantasia;
	public Integer situacao_cadastral;
	public String descricao_situacao_cadastral;
	public String data_situacao_cadastral;
	public Integer motivo_situacao_cadastral;
	public String nome_cidade_exterior;
	public Integer codigo_natureza_juridica;
	public String data_inicio_atividade;
	public Integer cnae_fiscal;
	public String cnae_fiscal_descricao;
	public String pais;
	public String descricao_tipo_de_logradouro;
	public String logradouro;
	public String numero;
	public String complemento;
	public String bairro;
	public Integer cep;
	public String uf;
	public Integer codigo_municipio;
	public String municipio;
	public String ddd_telefone_1;
	public String ddd_telefone_2;
	public String ddd_fax;
	public Integer qualificacao_do_responsavel;
	public Integer capital_social;
	public String porte;
	public String descricao_porte;
	public Boolean opcao_pelo_simples;
	public String data_opcao_pelo_simples;
	public String data_exclusao_do_simples;
	public Boolean opcao_pelo_mei;
	public String situacao_especial;
	public String data_situacao_especial;
	public List<Cnaes_secundarios> cnaes_secundarios;
	public List<Qsa> qsa;

	public class Cnaes_secundarios {
		public Integer codigo;
		public String descricao;
	}

	public class Qsa {
		public Integer identificador_de_socio;
		public String nome_socio;
		public String cnpj_cpf_do_socio;
		public Integer codigo_qualificacao_socio;
		public Integer percentual_capital_social;
		public String data_entrada_sociedade;
		public String cpf_representante_legal;
		public String nome_representante_legal;
		public Integer codigo_qualificacao_representante_legal;
	}

	public static APIBrasilServiceObject parse(String json) {
		return (APIBrasilServiceObject) System.JSON.deserialize(
			json,
			APIBrasilServiceObject.class
		);
	}
}
