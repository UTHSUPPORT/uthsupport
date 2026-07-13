import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TicketFilters from '../components/TicketFilters';
import TicketTable from '../components/TicketTable';
import { ticketsAPI } from '../api/ticketsClient';
import { useAuth } from '../context/AuthContext';
import { Plus } from 'lucide-react';

const TicketsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    assigned_to: '',
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const limit = 20;

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await ticketsAPI.getAll({
        ...filters,
        search: filters.search || undefined,
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        category: filters.category || undefined,
        assigned_to: filters.assigned_to || undefined,
        page,
        limit,
      });
      setTickets(res.data.data);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    fetchTickets();
  }, [filters, page]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
          {user?.role === 'CUSTOMER' && (
            <button
              onClick={() => navigate('/tickets/new')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-all"
            >
              <Plus size={20} />
              <span>New Ticket</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <TicketFilters onFilterChange={handleFilterChange} />

        {/* Tickets Table */}
        <div className="mt-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading tickets...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">No tickets found</p>
              {user?.role === 'CUSTOMER' && (
                <button
                  onClick={() => navigate('/tickets/new')}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create your first ticket
                </button>
              )}
            </div>
          ) : (
            <>
              <TicketTable tickets={tickets} />

              {/* Pagination */}
              {pages > 1 && (
                <div className="mt-6 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-3 py-2 rounded-lg ${
                            page === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setPage(Math.min(pages, page + 1))}
                    disabled={page === pages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          Showing {tickets.length > 0 ? (page - 1) * limit + 1 : 0} to{' '}
          {Math.min(page * limit, total)} of {total} tickets
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;