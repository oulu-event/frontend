class Notification {
    #id;
    #title;
    #description;

    constructor({ id, title, description }) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
    }

    static async getAllNotifications() {
        try {
            const response = await fetch('http://localhost:3001/notification/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            return result.map(data => new Notification(data));
        } catch (err) {
            console.error('Error retrieving notifications:', err);
            throw new Error('Failed to retrieve notifications');
        }
    }

    static async createNotification(title, description) {
        if (!title || !description) {
            throw new Error('Title and description are required');
        }

        try {
            const response = await fetch('http://localhost:3001/notification/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                })
            });
            const newNotification = await response.json();
            return new Notification(newNotification);
        } catch (err) {
            console.error('Error creating notification:', err);
            throw new Error('Failed to create notification');
        }
    }
}

export { Notification };