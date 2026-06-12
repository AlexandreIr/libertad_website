'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { segments, services } from '@/data/site';

export function BudgetForm() {
  const [serviceRows, setServiceRows] = useState([0]);

  const addServiceRow = () => {
    setServiceRows((prev) => [...prev, prev.length]);
  };

  const removeServiceRow = (id: number) => {
    setServiceRows((prev) => (prev.length > 1 ? prev.filter((item) => item !== id) : prev));
  };

  return (
    <form action="/orcamento/obrigado" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      <h2 className="font-heading text-2xl font-black text-ink">Preencha o formulário</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Quanto mais detalhes você enviar, mais assertiva será nossa proposta.</p>

      <div className="mt-8 grid gap-5">
        <Field label="Nome completo" name="nome" placeholder="Digite seu nome completo" required />
        <Field label="Empresa" name="empresa" placeholder="Razão social da empresa" required />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Telefone / WhatsApp" name="telefone" placeholder="(11) 99999-9999" required />
          <Field label="E-mail" name="email" type="email" placeholder="seu@email.com" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="CNPJ" name="cnpj" placeholder="00.000.000/0001-00" required />
          <Field label="Cargo / função" name="cargo" placeholder="Ex.: Supervisor de limpeza" required />
        </div>

        <Field label="Cidade" name="cidade" placeholder="Informe sua cidade" required />

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-ink">Serviços desejados</p>
              <p className="text-xs text-slate-500">Adicione quantos serviços quiser na mesma solicitação.</p>
            </div>
            <button
              type="button"
              onClick={addServiceRow}
              className="inline-flex items-center justify-center rounded-full bg-royal px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy hover:cursor-pointer"
            >
              + Adicionar serviço
            </button>
          </div>

          <div className="mt-4 grid gap-4">
            {serviceRows.map((rowId, index) => (
              <div key={rowId} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-ink">Serviço {index + 1}</p>
                  {serviceRows.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeServiceRow(rowId)}
                      className="text-xs font-semibold text-slate-500 transition hover:text-red hover:cursor-pointer"
                    >
                      Remover
                    </button>
                  ) : null}
                </div>
                <div className="mt-3">
                  <Select label="Tipo de serviço desejado" name={`servico_${index + 1}`} options={services.map((service) => service.title)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Quantidade de pessoas necessárias" name="quantidade_pessoas" type="number" placeholder="Ex.: 5" />
          <Select label="Segmento da empresa" name="segmento" options={segments.map((segment) => segment.title)} />
        </div>

        <Field label="Quantidade aproximada de colaboradores ou unidades" name="tamanho" placeholder="Ex.: 25 colaboradores ou 3 unidades" />
        <FileField label="Anexe um arquivo (opcional)" name="arquivo" accept=".pdf,.doc,.docx,.jpg,.png" />

        <label className="grid gap-2 text-sm font-bold text-ink">
          Mensagem
          <textarea
            name="mensagem"
            rows={5}
            placeholder="Conte-nos mais sobre suas necessidades, objetivos e expectativas..."
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-royal"
          />
        </label>

        <label className="flex gap-3 text-sm leading-6 text-slate-600">
          <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-slate-300" />
          Ao enviar, você concorda com o tratamento dos seus dados conforme nossa Política de Privacidade.
        </label>

        <Button type="submit" className="w-full">Enviar solicitação de orçamento</Button>
        <p className="text-center text-xs text-slate-500">Seus dados estão seguros conosco.</p>
      </div>
    </form>
  );
}

function Field({ label, name, placeholder, type = 'text', required = false }: { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}{required ? ' *' : ''}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-royal"
      />
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <select name={name} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-royal">
        <option value="">Selecione</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function FileField({ label, name, accept }: { label: string; name: string; accept?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <input
        name={name}
        type="file"
        accept={accept}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-normal outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-royal file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-navy hover:file:cursor-pointer focus:border-royal"
      />
    </label>
  );
}
