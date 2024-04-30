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

    static async createNotification(title, description, datetime, user_id) {
        if (!title || !description || !datetime || !user_id) {
          throw new Error('Title, description, datetime, and user_id are required');
        }
      
        try {
          const response = await fetch('http://localhost:3001/notification/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: title,
              description: description,
              datetime: datetime,
              user_id: user_id
            })
          });
      
          if (!response.ok) {
            throw new Error('Failed to create notification');
          }
      
          const newNotification = await response.json();
          return new Notification(newNotification);
        } catch (err) {
          console.error('Error creating notification:', err);
          throw new Error('Failed to create notification');
        }
      }

      
      static async updateNotification(id, title, description, datetime) {
        if (!title || !description || !datetime) {
          throw new Error('Title, description, and datetime are required');
        }
      
        try {
          const response = await fetch(`http://localhost:3001/notification/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: title,
              description: description,
              datetime: datetime
            })
          });
      
          if (!response.ok) {
            throw new Error('Failed to update notification');
          }
      
          const updatedNotification = await response.json();
          return updatedNotification;
        } catch (err) {
          console.error('Error updating notification:', err);
          throw new Error('Failed to update notification');
        }
      }

      
      static async deleteNotification(id) {
        try {
          const response = await fetch(`http://localhost:3001/notification/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete notification');
          }
      
          const deletedNotification = await response.json();
          return deletedNotification;
        } catch (err) {
          console.error('Error deleting notification:', err);
          throw new Error('Failed to delete notification');
        }
      }
      
}

export { Notification };