
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNotebooks } from '@/hooks/useNotebooks';
import { useSources } from '@/hooks/useSources';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import NotebookHeader from '@/components/notebook/NotebookHeader';
import SourcesSidebar from '@/components/notebook/SourcesSidebar';
import ChatArea from '@/components/notebook/ChatArea';
import StudioSidebar from '@/components/notebook/StudioSidebar';
import MobileNotebookTabs from '@/components/notebook/MobileNotebookTabs';
import { Citation } from '@/types/message';

const Notebook = () => {
  const { id: notebookId } = useParams();
  const { notebooks } = useNotebooks();
  const { sources } = useSources(notebookId);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [isSourcesCollapsed, setIsSourcesCollapsed] = useState(false);
  const [isStudioCollapsed, setIsStudioCollapsed] = useState(false);
  const isDesktop = useIsDesktop();

  const notebook = notebooks?.find(n => n.id === notebookId);
  const hasSource = sources && sources.length > 0;
  const isSourceDocumentOpen = !!selectedCitation;

  const handleCitationClick = (citation: Citation) => {
    setSelectedCitation(citation);
  };

  const handleCitationClose = () => {
    setSelectedCitation(null);
  };

  // Dynamic width calculations for desktop - adjust based on collapsed states
  const getSourcesWidth = () => {
    if (isSourcesCollapsed) return 'w-12';
    if (isSourceDocumentOpen) return 'w-[35%]';
    return 'w-[25%]';
  };

  const getStudioWidth = () => {
    if (isStudioCollapsed) return 'w-12';
    return 'w-[30%]';
  };

  const sourcesWidth = getSourcesWidth();
  const studioWidth = getStudioWidth();

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <NotebookHeader 
        title={notebook?.title || 'Untitled Notebook'} 
        notebookId={notebookId} 
      />
      
      {isDesktop ? (
        // Desktop layout (3-column)
        <div className="flex-1 flex overflow-hidden">
          <div className={`${sourcesWidth} flex-shrink-0 transition-all duration-300`}>
            <SourcesSidebar 
              hasSource={hasSource || false} 
              notebookId={notebookId}
              selectedCitation={selectedCitation}
              onCitationClose={handleCitationClose}
              setSelectedCitation={setSelectedCitation}
              isCollapsed={isSourcesCollapsed}
              onToggleCollapse={() => setIsSourcesCollapsed(!isSourcesCollapsed)}
            />
          </div>
          
          {/* Chat area expands to fill remaining space, especially when both sidebars are collapsed */}
          <div className="flex-1 transition-all duration-300 min-w-0 overflow-hidden">
            <ChatArea 
              hasSource={hasSource || false} 
              notebookId={notebookId}
              notebook={notebook}
              onCitationClick={handleCitationClick}
              isBothCollapsed={isSourcesCollapsed && isStudioCollapsed}
            />
          </div>
          
          <div className={`${studioWidth} flex-shrink-0 transition-all duration-300`}>
            <StudioSidebar 
              notebookId={notebookId} 
              onCitationClick={handleCitationClick}
              isCollapsed={isStudioCollapsed}
              onToggleCollapse={() => setIsStudioCollapsed(!isStudioCollapsed)}
            />
          </div>
        </div>
      ) : (
        // Mobile/Tablet layout (tabs)
        <MobileNotebookTabs
          hasSource={hasSource || false}
          notebookId={notebookId}
          notebook={notebook}
          selectedCitation={selectedCitation}
          onCitationClose={handleCitationClose}
          setSelectedCitation={setSelectedCitation}
          onCitationClick={handleCitationClick}
        />
      )}
    </div>
  );
};

export default Notebook;
