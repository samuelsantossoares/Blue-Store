* {
  margin: 0
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 2px solid #FF8C00;
}

header h1 {
  color: #FF8C00;
  font-size: 2.5rem;
}

.btn-white {
  background-color: #fff;
  color: #000;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-white:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
}

main {
  margin-top: 50px;
  color: #ccc;
}

main h2 {
  color: #FF8C00;
  margin-bottom: 20px;
  font-size: 2rem;
}

#userInfo {
  color: #FF8C00;
  font-weight: bold;
  font-size: 1.2rem;
}

.hidden {
  display: none;
}