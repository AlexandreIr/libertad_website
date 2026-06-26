'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { segments, services } from '@/data/site';

const MAIL_API_URL =
  process.env.NEXT_PUBLIC_MAIL_API_URL ?? 'http://localhost:8082/api/mail';

type ServiceRow = {
  id: number;
  value: string;
};

export function BudgetForm() {
  const router = useRouter();

  const nextServiceId = useRef(2);

  const [serviceRows, setServiceRows] = useState<ServiceRow[]>([
    { id: 1, value: '' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addServiceRow = () => {
    setServiceRows((prev) => [
      ...prev,
      {
        id: nextServiceId.current++,
        value: '',
      },
    ]);
  };

  const removeServiceRow = (id: number) => {
    setServiceRows((prev) =>
      prev.length > 1 ? prev.filter((item) => item.id !== id) : prev,
    );
  };

  const updateServiceRow = (id: number, value: string) => {
    setServiceRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, value } : row)),
    );
  };

 async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setErrorMessage('');

  const selectedServices = serviceRows
    .map((row) => row.value.trim())
    .filter(Boolean);

  if (selectedServices.length === 0) {
    setErrorMessage('Selecione pelo menos um serviço desejado.');
    return;
  }

  try {
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.delete('tiposServicos');

    selectedServices.forEach((service) => {
      formData.append('tiposServicos', service);
    });

    formData.append('tiposServicosTexto', selectedServices.join(', '));

    const arquivo = formData.get('arquivo');

    if (arquivo instanceof File && arquivo.size === 0) {
      formData.delete('arquivo');
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Payload enviado para /api/mail:');

      for (const [key, value] of formData.entries()) {
        console.log(
          key,
          value instanceof File
            ? {
                name: value.name,
                size: value.size,
                type: value.type,
              }
            : value,
        );
      }
    }

    const response = await fetch(MAIL_API_URL, {
      method: 'POST',
      body: formData,
    });

    const contentType = response.headers.get('content-type');

    const responseBody = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const apiMessage =
        typeof responseBody === 'object' &&
        responseBody !== null &&
        'message' in responseBody
          ? String(responseBody.message)
          : typeof responseBody === 'string' && responseBody.trim()
            ? responseBody
            : 'Não foi possível enviar sua solicitação.';

      throw new Error(apiMessage);
    }

    router.push('/orcamento/obrigado');
  } catch (error) {
    console.error('Erro ao enviar orçamento:', error);

    setErrorMessage(
      error instanceof Error
        ? error.message
        : 'Erro inesperado ao enviar o formulário.',
    );
  } finally {
    setIsSubmitting(false);
  }
}

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card sm:p-8"
    >
      <h2 className="font-heading text-2xl font-black text-ink">
        Preencha o formulário
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Quanto mais detalhes você enviar, mais assertiva será nossa proposta.
      </p>

      <div className="mt-8 grid gap-5">
        <Field
          label="Nome completo"
          name="nomeCliente"
          placeholder="Digite seu nome completo"
          required
        />

        <Field
          label="Empresa"
          name="nomeEmpresa"
          placeholder="Razão social da empresa"
          required
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Telefone / WhatsApp"
            name="telefone"
            placeholder="(11) 99999-9999"
            required
          />

          <Field
            label="E-mail"
            name="email"
            type="email"
            placeholder="seu@email.com"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="CNPJ"
            name="cnpj"
            placeholder="00.000.000/0001-00"
            required
          />

          <Field
            label="Cargo / função"
            name="funcaoNaEmpresa"
            placeholder="Ex.: Supervisor de limpeza"
            required
          />
        </div>

        <Field
          label="Cidade"
          name="cidade"
          placeholder="Informe sua cidade"
          required
        />

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-ink">
                Serviços desejados
              </p>

              <p className="text-xs text-slate-500">
                Adicione quantos serviços quiser na mesma solicitação.
              </p>
            </div>

            <button
              type="button"
              onClick={addServiceRow}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-royal px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
            >
              + Adicionar serviço
            </button>
          </div>

          <div className="mt-4 grid gap-4">
            {serviceRows.map((row, index) => (
              <div
                key={row.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-ink">
                    Serviço {index + 1}
                  </p>

                  {serviceRows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeServiceRow(row.id)}
                      disabled={isSubmitting}
                      className="text-xs font-semibold text-slate-500 transition hover:text-red disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Remover
                    </button>
                  )}
                </div>

                <div className="mt-3">
                  <Select
                    label="Tipo de serviço desejado"
                    name={`servico_${index + 1}`}
                    value={row.value}
                    onChange={(value) => updateServiceRow(row.id, value)}
                    options={services.map((service) => service.title)}
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Quantidade de pessoas necessárias"
            name="quantidade"
            type="number"
            placeholder="Ex.: 5"
          />

          <Select
            label="Segmento da empresa"
            name="segmento"
            options={segments.map((segment) => segment.title)}
          />
        </div>

        <FileField
          label="Anexe um arquivo (opcional)"
          name="arquivo"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />

        <label className="grid gap-2 text-sm font-bold text-ink">
          Mensagem

          <textarea
            name="mensagemPersonalizada"
            rows={5}
            placeholder="Conte-nos mais sobre suas necessidades, objetivos e expectativas..."
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-royal"
          />
        </label>

        <label className="flex gap-3 text-sm leading-6 text-slate-600">
          <input
            type="checkbox"
            name="aceite_privacidade"
            value="true"
            required
            className="mt-1 h-4 w-4 rounded border-slate-300"
          />

          Ao enviar, você concorda com o tratamento dos seus dados conforme nossa
          Política de Privacidade.
        </label>

        {errorMessage && (
          <p className="rounded-xl border border-red/20 bg-red/5 px-4 py-3 text-sm font-semibold text-red">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-royal px-6 py-3 text-sm font-bold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar solicitação de orçamento'}
        </button>

        <p className="text-center text-xs text-slate-500">
          Seus dados estão seguros conosco.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      {required ? ' *' : ''}

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

function Select({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      {required ? ' *' : ''}

      <select
        name={name}
        value={value}
        required={required}
        onChange={(event) => onChange?.(event.target.value)}
        className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-royal"
      >
        <option value="">Selecione</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FileField({
  label,
  name,
  accept,
}: {
  label: string;
  name: string;
  accept?: string;
}) {
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