## Getting Started

After cloning this repository, follow these steps to run the project locally:

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gorawit1657/ATA-IT-Frontend-Assignment.git
   cd 
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional required packages**
   ```bash
   npm install react-bootstrap bootstrap lucide-react
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Project Structure

```
src/
├── components/
│   ├── common/           # Reusable components
│   ├── ExpandableOrderRow.jsx
│   ├── OrderTable.jsx
│   └── SearchForm.jsx
├── hooks/
│   └── useOrders.js      # Custom hook for order management
├── utils/
│   ├── constants.js
│   └── dateUtils.js
├── data/
│   └── mockData.js       # Sample data for testing
└── App.jsx
```


---

**Note**: This application uses mock data for demonstration purposes.
