import React, { useState, useEffect } from 'react';
import { Star, Plus, Trash2, Search, Download, HelpCircle, X } from 'lucide-react';

// Simple localStorage wrapper to replace window.storage
const storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? { key, value } : null;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(key, value);
      return { key, value };
    } catch (error) {
      console.error('Storage set error:', error);
      return null;
    }
  }
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showRatingGuide, setShowRatingGuide] = useState(false);
  const [useQuickAdd, setUseQuickAdd] = useState(false);

  const hallmark2025Movies = [
    { title: "Merry Christmas, Ted Cooper!", airDate: "2025-10-18", network: "Hallmark Channel" },
    { title: "Season's Greetings from Cherry Lane", airDate: "2025-10-26", network: "Hallmark Channel" },
    { title: "Happy Holidays from Cherry Lane", airDate: "2025-10-26", network: "Hallmark Channel" },
    { title: "Deck the Halls on Cherry Lane", airDate: "2025-10-26", network: "Hallmark Channel" },
    { title: "The Magic of Lemon Drops", airDate: "2025-11-01", network: "Hallmark Channel" },
    { title: "Tis the Season to be Irish", airDate: "2025-11-02", network: "Hallmark Channel" },
    { title: "Holiday Mismatch", airDate: "2025-11-03", network: "Hallmark Channel" },
    { title: "A Keller Christmas Vacation", airDate: "2025-11-09", network: "Hallmark Channel" },
    { title: "Three Wisest Men", airDate: "2025-11-15", network: "Hallmark Channel" },
    { title: "Tidings for the Season", airDate: "2025-11-16", network: "Hallmark Channel" },
    { title: "Holiday Touchdown: A Bills Love Story", airDate: "2025-11-22", network: "Hallmark Channel" },
    { title: "Melt My Heart This Christmas", airDate: "2025-11-23", network: "Hallmark Channel" },
    { title: "We Met in December", airDate: "2025-11-27", network: "Hallmark Channel" },
    { title: "A Grand Ole Opry Christmas", airDate: "2025-11-30", network: "Hallmark Channel" },
    { title: "A Very Merry Beauty Salon", airDate: "2025-12-01", network: "Hallmark Channel" },
    { title: "Holiday Spectacular", airDate: "2025-12-06", network: "Hallmark Channel" },
    { title: "The Christmas Charade", airDate: "2025-12-07", network: "Hallmark Channel" },
    { title: "Trivia at St. Nick's", airDate: "2025-12-08", network: "Hallmark Channel" },
    { title: "The More The Merrier", airDate: "2025-12-13", network: "Hallmark Channel" },
    { title: "She's Making a List", airDate: "2025-12-14", network: "Hallmark Channel" },
    { title: "Twelve Dates 'Til Christmas", airDate: "2025-12-15", network: "Hallmark Channel" },
    { title: "A Carol for Two", airDate: "2025-12-20", network: "Hallmark Channel" },
    { title: "A Royal Montana Christmas", airDate: "2025-12-21", network: "Hallmark Channel" }
  ];

  const [newMovie, setNewMovie] = useState({
    title: '',
    airDate: '',
    network: 'Hallmark Channel',
    rating: 0,
    watched: false,
    predictability: 3,
    chemistry: 3,
    festivity: 3,
    storyline: 3,
    shirtless: false,
    earlyKiss: false,
    drinkingLevel: 3,
    notes: ''
  });

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const result = await storage.get('hallmark-movies-2025');
      if (result) {
        setMovies(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No saved movies yet');
    }
  };

  const saveMovies = async (updatedMovies) => {
    try {
      await storage.set('hallmark-movies-2025', JSON.stringify(updatedMovies));
      setMovies(updatedMovies);
    } catch (error) {
      console.error('Error saving movies:', error);
    }
  };

  const addMovie = () => {
    if (!newMovie.title || !newMovie.airDate) return;
    
    const movie = {
      ...newMovie,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString()
    };
    
    const updatedMovies = [...movies, movie];
    saveMovies(updatedMovies);
    
    setNewMovie({
      title: '',
      airDate: '',
      network: 'Hallmark Channel',
      rating: 0,
      watched: false,
      predictability: 3,
      chemistry: 3,
      festivity: 3,
      storyline: 3,
      shirtless: false,
      earlyKiss: false,
      drinkingLevel: 3,
      notes: ''
    });
    setShowAddForm(false);
    setUseQuickAdd(false);
  };

  const quickAddFromList = (selectedMovie) => {
    const movie = {
      ...selectedMovie,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      rating: 0,
      watched: false,
      predictability: 3,
      chemistry: 3,
      festivity: 3,
      storyline: 3,
      shirtless: false,
      earlyKiss: false,
      drinkingLevel: 3,
      notes: ''
    };
    
    const updatedMovies = [...movies, movie];
    saveMovies(updatedMovies);
  };

  const deleteMovie = (id) => {
    const updatedMovies = movies.filter(m => m.id !== id);
    saveMovies(updatedMovies);
  };

  const updateMovie = (id, updates) => {
    const updatedMovies = movies.map(m => 
      m.id === id ? { ...m, ...updates } : m
    );
    saveMovies(updatedMovies);
  };

  const calculateOverallScore = (movie) => {
    if (!movie.watched) return 0;
    return ((movie.predictability + movie.chemistry + movie.festivity + movie.storyline) / 16 * 5).toFixed(1);
  };

  const downloadEvaluation = () => {
    const csvContent = [
      ['Title', 'Air Date', 'Network', 'Watched', 'Overall Rating', 'Predictability', 'Chemistry', 'Festivity', 'Storyline', 'Shirtless Scene', 'Early Kiss', 'Drinking Level', 'Calculated Score', 'Notes'],
      ...movies.map(m => [
        m.title,
        m.airDate,
        m.network,
        m.watched ? 'Yes' : 'No',
        m.rating,
        m.predictability,
        m.chemistry,
        m.festivity,
        m.storyline,
        m.shirtless ? 'Yes' : 'No',
        m.earlyKiss ? 'Yes' : 'No',
        m.drinkingLevel || 3,
        calculateOverallScore(m),
        `"${(m.notes || '').replace(/"/g, '""')}"`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `hallmark-movies-2025-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredAndSortedMovies = movies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = filterRating === 'all' || 
        (filterRating === 'watched' && movie.watched) ||
        (filterRating === 'unwatched' && !movie.watched) ||
        (filterRating === 'high' && movie.rating >= 4) ||
        (filterRating === 'low' && movie.rating > 0 && movie.rating < 3);
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(a.airDate) - new Date(b.airDate);
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const StarRating = ({ rating, onChange, size = 'small' }) => {
    const starSize = size === 'small' ? 'w-5 h-5' : 'w-6 h-6';
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} cursor-pointer transition-colors ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };

  const CategorySlider = ({ label, value, onChange }) => (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{value}/5</span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-2">🎄 Hallmark Christmas Movie Evaluator</h1>
          <p className="text-gray-600">Track and rate your 2025 Hallmark Christmas movie marathon</p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3 text-lg">📖 How to Use This Tool</h3>
          <div className="text-blue-900 space-y-2 text-sm">
            <p><strong>1. Add Movies:</strong> Click "Add New Movie" to enter title, air date, and network.</p>
            <p><strong>2. Mark as Watched:</strong> Check the "Watched" box after viewing to unlock detailed ratings.</p>
            <p><strong>3. Rate & Evaluate:</strong> Give an overall star rating, then fill out the detailed categories including predictability, chemistry, festivity, storyline, and fun highlights!</p>
            <p><strong>4. Add Notes:</strong> Jot down favorite moments, plot details, or any thoughts.</p>
            <p><strong>5. Search & Filter:</strong> Use the search bar and filters to find specific movies or see your top-rated ones.</p>
            <p><strong>💾 Auto-Save:</strong> All your data is automatically saved in your browser and will be there when you return!</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Movies</option>
                <option value="watched">Watched</option>
                <option value="unwatched">Not Watched</option>
                <option value="high">High Rated (4+)</option>
                <option value="low">Low Rated (&lt;3)</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="date">Sort by Air Date</option>
                <option value="rating">Sort by Rating</option>
                <option value="title">Sort by Title</option>
              </select>
              <button
                onClick={downloadEvaluation}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                title="Download as CSV"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Movie
          </button>

          <button
            onClick={() => setShowRatingGuide(!showRatingGuide)}
            className="w-full mt-3 bg-purple-100 text-purple-700 py-2 rounded-lg font-semibold hover:bg-purple-200 transition-colors flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-5 h-5" />
            {showRatingGuide ? 'Hide' : 'Show'} Rating Guide
          </button>
        </div>

        {showRatingGuide && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">Rating Guide & Definitions</h3>
              <button onClick={() => setShowRatingGuide(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">⭐ Overall Star Rating</h4>
                <div className="space-y-1 text-sm text-purple-900">
                  <p><strong>5 Stars:</strong> Perfect! Instant classic, would rewatch multiple times</p>
                  <p><strong>4 Stars:</strong> Really enjoyed it, would recommend and might rewatch</p>
                  <p><strong>3 Stars:</strong> Good/average Hallmark movie, entertaining enough</p>
                  <p><strong>2 Stars:</strong> Below average, had some issues or boring parts</p>
                  <p><strong>1 Star:</strong> Disappointing, struggled to finish</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">🎯 Predictability Factor</h4>
                <div className="space-y-1 text-sm text-blue-900">
                  <p><strong>1:</strong> Shocking twists! Genuinely surprised by plot developments</p>
                  <p><strong>2:</strong> Some unexpected moments, not entirely formulaic</p>
                  <p><strong>3:</strong> Standard Hallmark fare with a few minor surprises</p>
                  <p><strong>4:</strong> Very predictable, hit all the usual beats</p>
                  <p><strong>5:</strong> Could predict every plot point - classic formula</p>
                </div>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-bold text-pink-900 mb-2">💕 Lead Chemistry</h4>
                <div className="space-y-1 text-sm text-pink-900">
                  <p><strong>5:</strong> Electric! Incredible spark, rooting for them intensely</p>
                  <p><strong>4:</strong> Strong chemistry, believable romance</p>
                  <p><strong>3:</strong> Decent chemistry, acceptable romance</p>
                  <p><strong>2:</strong> Weak chemistry, felt forced or awkward</p>
                  <p><strong>1:</strong> No chemistry, like watching strangers</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-bold text-red-900 mb-2">🎄 Christmas Festivity Level</h4>
                <div className="space-y-1 text-sm text-red-900">
                  <p><strong>5:</strong> Maximum holiday vibes! Decorations, traditions, carols everywhere</p>
                  <p><strong>4:</strong> Very festive with lots of Christmas activities</p>
                  <p><strong>3:</strong> Moderate Christmas presence throughout</p>
                  <p><strong>2:</strong> Light Christmas elements, could be any season</p>
                  <p><strong>1:</strong> Barely Christmas-themed</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">📖 Storyline Quality</h4>
                <div className="space-y-1 text-sm text-green-900">
                  <p><strong>5:</strong> Compelling, well-written, engaging throughout</p>
                  <p><strong>4:</strong> Good story with solid pacing and character development</p>
                  <p><strong>3:</strong> Acceptable plot, some good and weak moments</p>
                  <p><strong>2:</strong> Weak story, plot holes, or draggy pacing</p>
                  <p><strong>1:</strong> Poor storyline, confusing or boring</p>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-2">🍷 Drinking Activity Level</h4>
                <div className="space-y-1 text-sm text-orange-900">
                  <p><strong>5:</strong> Constant beverages! Every scene has wine, cocoa, eggnog, etc.</p>
                  <p><strong>4:</strong> Frequent drinking scenes throughout</p>
                  <p><strong>3:</strong> Moderate amount - a few key scenes</p>
                  <p><strong>2:</strong> Minimal drinking, just a scene or two</p>
                  <p><strong>1:</strong> No alcoholic or festive beverages shown</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAddForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Movie</h3>
            
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setUseQuickAdd(false)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                  !useQuickAdd 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Manual Entry
              </button>
              <button
                onClick={() => setUseQuickAdd(true)}
                className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                  useQuickAdd 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                2025 Movie List
              </button>
            </div>

            {useQuickAdd ? (
              <div>
                <p className="text-sm text-gray-600 mb-3">
                  Select from Hallmark's 2025 Countdown to Christmas lineup:
                </p>
                <div className="max-h-96 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-3">
                  {hallmark2025Movies
                    .filter(m => !movies.some(existing => existing.title === m.title))
                    .map((movie, idx) => (
                      <div 
                        key={idx}
                        className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{movie.title}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(movie.airDate).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <button
                          onClick={() => quickAddFromList(movie)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  {hallmark2025Movies.filter(m => !movies.some(existing => existing.title === m.title)).length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      All 2025 movies have been added! 🎉
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Movie Title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="date"
                    value={newMovie.airDate}
                    onChange={(e) => setNewMovie({ ...newMovie, airDate: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                  <select
                    value={newMovie.network}
                    onChange={(e) => setNewMovie({ ...newMovie, network: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    <option>Hallmark Channel</option>
                    <option>Hallmark Movies & Mysteries</option>
                    <option>Hallmark+</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={addMovie}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Add Movie
                  </button>
                </div>
              </div>
            )}
            
            <button
              onClick={() => {
                setShowAddForm(false);
                setUseQuickAdd(false);
              }}
              className="w-full mt-3 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="grid gap-6">
          {filteredAndSortedMovies.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <p className="text-gray-500 text-lg">No movies added yet. Start tracking your Hallmark Christmas marathon!</p>
            </div>
          ) : (
            filteredAndSortedMovies.map((movie) => (
              <div key={movie.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{movie.title}</h3>
                    <p className="text-gray-600">
                      {new Date(movie.airDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })} • {movie.network}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteMovie(movie.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={movie.watched}
                      onChange={(e) => updateMovie(movie.id, { watched: e.target.checked })}
                      className="w-5 h-5 accent-red-600 cursor-pointer"
                    />
                    <span className="font-medium text-gray-700">Watched</span>
                  </label>

                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-700 block mb-2">Overall Rating</span>
                    <StarRating
                      rating={movie.rating}
                      onChange={(rating) => updateMovie(movie.id, { rating })}
                    />
                  </div>
                </div>

                {movie.watched && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Detailed Evaluation</h4>
                    <CategorySlider
                      label="Predictability Factor (1=Surprising, 5=Classic Formula)"
                      value={movie.predictability}
                      onChange={(val) => updateMovie(movie.id, { predictability: val })}
                    />
                    <CategorySlider
                      label="Lead Chemistry"
                      value={movie.chemistry}
                      onChange={(val) => updateMovie(movie.id, { chemistry: val })}
                    />
                    <CategorySlider
                      label="Christmas Festivity Level"
                      value={movie.festivity}
                      onChange={(val) => updateMovie(movie.id, { festivity: val })}
                    />
                    <CategorySlider
                      label="Storyline Quality"
                      value={movie.storyline}
                      onChange={(val) => updateMovie(movie.id, { storyline: val })}
                    />
                    
                    <div className="border-t border-gray-300 mt-4 pt-4">
                      <h5 className="font-semibold text-gray-800 mb-3">Fun Highlights 🎉</h5>
                      
                      <label className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          checked={movie.shirtless || false}
                          onChange={(e) => updateMovie(movie.id, { shirtless: e.target.checked })}
                          className="w-5 h-5 accent-red-600 cursor-pointer"
                        />
                        <span className="text-gray-700">Shirtless Male Lead Scene 🔥</span>
                      </label>
                      
                      <label className="flex items-center gap-2 mb-4">
                        <input
                          type="checkbox"
                          checked={movie.earlyKiss || false}
                          