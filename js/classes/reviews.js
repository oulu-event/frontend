class Review {
    #id;
    #title;
    #description;

    constructor({ id, title, description }) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
    }

    static async getAllReviews() {
        try {
            const response = await fetch('http://localhost:3001/review/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            return result.map(data => new Review(data));
        } catch (err) {
            console.error('Error retrieving reviews:', err);
            throw new Error('Failed to retrieve reviews');
        }
    }

    static async createReview(title, description, datetime, user_id) {
        if (!title || !description || !rating || !datetime || !user_id) {
          throw new Error('Title, description, datetime, rating and user_id are required');
        }
      
        try {
          const response = await fetch('http://localhost:3001/review/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: title,
              description: description,
              datetime: datetime,
              rating: rating,
              user_id: user_id
            })
          });
      
          if (!response.ok) {
            throw new Error('Failed to create review');
          }
      
          const newReview = await response.json();
          return new Review(newReview);
        } catch (err) {
          console.error('Error creating review:', err);
          throw new Error('Failed to create review');
        }
      }

      
      static async updateReview(id, title, description, datetime) {
        if (!title || !description || !rating || !datetime) {
          throw new Error('Title, description, rating and datetime are required');
        }
      
        try {
          const response = await fetch(`http://localhost:3001/review/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: title,
              description: description,
              rating: rating,
              datetime: datetime
            })
          });
      
          if (!response.ok) {
            throw new Error('Failed to update review');
          }
      
          const updatedReview = await response.json();
          return updatedReview;
        } catch (err) {
          console.error('Error updating review:', err);
          throw new Error('Failed to update review');
        }
      }

      
      static async deleteReview(id) {
        try {
          const response = await fetch(`http://localhost:3001/review/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete review');
          }
      
          const deletedReview = await response.json();
          return deletedReview;
        } catch (err) {
          console.error('Error deleting review:', err);
          throw new Error('Failed to delete review');
        }
      }
      
}

export { Review };