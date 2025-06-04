
export default function RegistrationBenefits() {
  return (
    <div className="mt-8 p-6 glass-card rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Vantagens da conta grátis</h3>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>7 dias de acesso gratuito à área premium</span>
        </li>
        <li className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Visualização de todos os eventos</span>
        </li>
        <li className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Avaliações de eventos e fornecedores</span>
        </li>
      </ul>
    </div>
  );
}
