
import React from 'react';
import { VideoIcon, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TransactionFilters = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Badge 
          variant="secondary"
          className="bg-gray-700 text-white hover:bg-gray-700"
        >
          For review (25)
        </Badge>
        <Badge 
          variant="outline"
          className="border-gray-300"
        >
          Categorized
        </Badge>
        <Badge 
          variant="outline"
          className="border-gray-300"
        >
          Excluded
        </Badge>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-700"
        >
          <VideoIcon className="w-4 h-4 mr-2" />
          Video tutorials
        </Button>
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-700"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Take a tour
        </Button>
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-700"
        >
          Go to bank register
        </Button>
      </div>
    </div>
  );
};

export default TransactionFilters;
