import { Community } from '@/atoms/CommunitiesAtom'
import CommunityNotFound from '@/components/Community/CommunityNotFound'
import Header from '@/components/Community/Header'
import PageContent from '@/components/Layout/PageContent'
import { firestore } from '@/firebase/clientApp'
import safeJsonStringify from "safe-json-stringify";
import { doc, getDoc } from 'firebase/firestore'
import React from 'react'

// Définit les props attendues pour la page
type CommunityPageProps = {
  params: {
    community: string;
  };
};

// Composant serveur pour la page de communauté
const CommunityPage: React.FC<CommunityPageProps> = async ({ params }) => {
  const { community } = params;
  let communityData: Community | null = null;

  // Récupérer les données de la communauté depuis Firestore
  try {
    const communityDocRef = doc(firestore, 'communities', community);
    const communityDoc = await getDoc(communityDocRef);

    if (communityDoc.exists()) {
      communityData = JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })) as Community;
    }
  } catch (error) {
    console.log('Erreur lors de la récupération des données de la communauté :', error);
  }

  // Si la communauté n'existe pas, afficher le composant CommunityNotFound
  if (!communityData) return <CommunityNotFound />;
   
  return (
    <div>
       <Header communityData={communityData} />
       <PageContent>
          <div>
            <div>LMS</div>
          </div>
          <div>
            <div>RMS</div>
          </div>

       </PageContent>
    </div>
  );
};

export default CommunityPage;
