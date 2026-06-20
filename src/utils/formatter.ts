

export class Formatter {
    static formatDate(value: Date): string {
        const date = new Date(value);
        return Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(date);
    }
}