import React, { useState, useMemo } from 'react';
import { MaterialIcon } from '../components/MaterialIcon';
import { ToastSystem, useToast } from '../components/ToastSystem';
import { EmailSidebar } from '../components/email/EmailSidebar';
import { EmailList } from '../components/email/EmailList';
import { EmailReader } from '../components/email/EmailReader';
import { EmailComposer } from '../components/email/EmailComposer';
import { Email } from '../types/email';
import { mockEmails } from '../data/mockEmails';

interface EmailPageProps {
  onBack: () => void;
}

export const EmailPage: React.FC<EmailPageProps> = ({ onBack }) => {
  const { toasts, showToast, dismissToast } = useToast();
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedEmailIds, setSelectedEmailIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isComposing, setIsComposing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter emails
  const filteredEmails = useMemo(() => {
    let result = emails.filter((e) => {
      if (selectedFolder === 'favorites') return e.isFavorite;
      return e.folder === selectedFolder;
    });

    if (activeTab === 'unread') result = result.filter((e) => !e.isRead);
    else if (activeTab === 'read') result = result.filter((e) => e.isRead);
    else if (activeTab === 'favorites') result = result.filter((e) => e.isFavorite);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.subject.toLowerCase().includes(q) ||
          e.from.name.toLowerCase().includes(q) ||
          e.preview.toLowerCase().includes(q)
      );
    }

    return result;
  }, [emails, selectedFolder, activeTab, searchQuery]);

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || null;

  // Handlers
  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    // Mark as read
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRead: true } : e))
    );
  };

  const handleToggleSelect = (id: string) => {
    setSelectedEmailIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmailIds(filteredEmails.map((e) => e.id));
  };

  const handleDeselectAll = () => {
    setSelectedEmailIds([]);
  };

  const handleFavorite = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isFavorite: !e.isFavorite } : e))
    );
  };

  const handleMarkRead = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRead: true } : e))
    );
  };

  const handleMarkUnread = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRead: false } : e))
    );
  };

  const handleMoveToSpam = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, folder: 'spam' as const } : e))
    );
    if (selectedEmailId === id) setSelectedEmailId(null);
    showToast({ type: 'info', title: 'E-mail movido para spam', autoDismiss: true, duration: 3000 });
  };

  const handleDelete = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, folder: 'trash' as const } : e))
    );
    if (selectedEmailId === id) setSelectedEmailId(null);
    showToast({ type: 'info', title: 'E-mail excluído', autoDismiss: true, duration: 3000 });
  };

  const handleFavoriteSelected = () => {
    setEmails((prev) =>
      prev.map((e) =>
        selectedEmailIds.includes(e.id) ? { ...e, isFavorite: true } : e
      )
    );
  };

  const handleMarkReadSelected = () => {
    setEmails((prev) =>
      prev.map((e) =>
        selectedEmailIds.includes(e.id) ? { ...e, isRead: true } : e
      )
    );
    setSelectedEmailIds([]);
  };

  const handleMoveToSpamSelected = () => {
    setEmails((prev) =>
      prev.map((e) =>
        selectedEmailIds.includes(e.id) ? { ...e, folder: 'spam' as const } : e
      )
    );
    setSelectedEmailIds([]);
  };

  const handleDeleteSelected = () => {
    setEmails((prev) =>
      prev.map((e) =>
        selectedEmailIds.includes(e.id) ? { ...e, folder: 'trash' as const } : e
      )
    );
    setSelectedEmailIds([]);
  };

  const totalPages = Math.max(1, Math.ceil(filteredEmails.length / itemsPerPage));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#f0f2f5',
        overflow: 'hidden',
      }}
    >
      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          border: '1px solid #f0f0f0',
          borderRadius: '8px',
          margin: '16px',
          marginBottom: '0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        {/* Email sidebar (folder nav) */}
        <EmailSidebar
          selectedFolder={selectedFolder}
          onSelectFolder={(folder) => {
            setSelectedFolder(folder);
            setSelectedEmailId(null);
            setSelectedEmailIds([]);
            setActiveTab('all');
          }}
        />

        {/* Email list */}
        <EmailList
          emails={filteredEmails}
          selectedEmailId={selectedEmailId}
          selectedEmailIds={selectedEmailIds}
          searchQuery={searchQuery}
          activeTab={activeTab}
          selectedFolder={selectedFolder}
          onSelectEmail={handleSelectEmail}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onSearch={setSearchQuery}
          onTabChange={setActiveTab}
          onCompose={() => setIsComposing(true)}
          onBack={onBack}
          onFavorite={handleFavorite}
          onMarkRead={handleMarkRead}
          onMarkUnread={handleMarkUnread}
          onMoveToSpam={handleMoveToSpam}
          onDelete={handleDelete}
          onFavoriteSelected={handleFavoriteSelected}
          onMarkReadSelected={handleMarkReadSelected}
          onMoveToSpamSelected={handleMoveToSpamSelected}
          onDeleteSelected={handleDeleteSelected}
        />

        {/* Email reader */}
        {selectedEmail && (
          <EmailReader
            email={selectedEmail}
            onClose={() => setSelectedEmailId(null)}
            onToggleFavorite={handleFavorite}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Pagination footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 24px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #f0f0f0',
          margin: '0 16px 16px',
          borderRadius: '0 0 8px 8px',
          border: '1px solid #f0f0f0',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#595959' }}>10 itens por página</span>
          <button
            style={{
              background: 'transparent',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              padding: '3px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: '#595959',
            }}
          >
            <MaterialIcon name="chevron-down" size={14} />
          </button>
          <span style={{ fontSize: '13px', color: '#595959' }}>
            {filteredEmails.length} ite{filteredEmails.length !== 1 ? 'ns' : 'm'} total
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#595959' }}>Página</span>
          <input
            type="number"
            value={currentPage}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              if (v >= 1 && v <= totalPages) setCurrentPage(v);
            }}
            style={{
              width: '40px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              padding: '3px 6px',
              fontSize: '13px',
              textAlign: 'center',
              outline: 'none',
            }}
          />
          <span style={{ fontSize: '13px', color: '#595959' }}>de {totalPages} páginas</span>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              background: 'transparent',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: currentPage === 1 ? '#d9d9d9' : '#595959',
            }}
          >
            <MaterialIcon name="chevron-left" size={16} />
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              background: 'transparent',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: currentPage === totalPages ? '#d9d9d9' : '#595959',
            }}
          >
            <MaterialIcon name="chevron-right" size={16} />
          </button>
        </div>
      </div>

      {/* Composer modal */}
      {isComposing && <EmailComposer onClose={() => setIsComposing(false)} />}

      {/* Toast notifications */}
      <ToastSystem toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};
