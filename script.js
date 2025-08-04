document.getElementById('post-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = document.getElementById('post-content').value;

  await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });

  document.getElementById('post-content').value = '';
  loadPosts();
});

async function loadPosts() {
  const response = await fetch('/api/posts');
  const posts = await response.json();
  const postsContainer = document.getElementById('posts');
  
  postsContainer.innerHTML = posts.map(post => `
    <div class="post">
      <p>${post.content}</p>
      <small>${new Date(post.createdAt).toLocaleString()}</small>
    </div>
  `).join('');
}

// Carrega posts ao iniciar
loadPosts();
