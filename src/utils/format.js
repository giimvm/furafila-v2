const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatCurrency(cents) {
  return brl.format(cents / 100);
}

export function formatTime(isoDate) {
  return new Date(isoDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function firstName(fullName) {
  return (fullName ?? '').trim().split(/\s+/)[0] ?? '';
}

export function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}
