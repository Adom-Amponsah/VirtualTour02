import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict

class ApartmentMatcher:
    def __init__(self):
        self.importance_weights = {
            'Not Important': 0.2,
            'Somewhat': 0.6,
            'Very Important': 1.0
        }
        
        # Feature mapping for direct preferences
        self.feature_mapping = {
            'family': ['family_friendly_score', 'playground_nearby', 'school_distance'],
            'quiet': ['noise_level', 'distance_from_main_road', 'building_density'],
            'social': ['community_events', 'common_areas', 'nearby_entertainment'],
            'education': ['school_quality', 'library_nearby', 'educational_facilities'],
            'internet': ['internet_speed', 'fiber_availability'],
            'roads': ['road_condition', 'traffic_flow', 'parking_availability'],
            'streetLights': ['street_lighting', 'evening_safety_score'],
            'noise': ['ambient_noise_level', 'soundproofing_rating'],
            'religious': ['religious_facilities_nearby', 'worship_places_count'],
            'cafes': ['restaurants_nearby', 'cafe_count', 'dining_options'],
            'community': ['community_center_distance', 'social_spaces'],
            'security': ['security_rating', 'crime_rate', 'surveillance']
        }

    def calculate_match_score(self, 
                            apartment: Dict, 
                            preferences: Dict, 
                            embedding_model) -> float:
        """
        Calculate match score between apartment and user preferences
        """
        total_score = 0
        total_weight = 0
        
        for category, prefs in preferences.items():
            for feature, importance in prefs.items():
                weight = self.importance_weights[importance]
                
                # Get relevant apartment features
                apartment_features = [apartment.get(f, 0) 
                                   for f in self.feature_mapping[feature]]
                
                # Calculate feature score
                feature_score = np.mean(apartment_features)
                
                # Add to total score
                total_score += feature_score * weight
                total_weight += weight
        
        # Calculate final normalized score
        final_score = total_score / total_weight if total_weight > 0 else 0
        
        # Get embeddings for semantic matching
        apartment_desc_embedding = embedding_model.embed(apartment['description'])
        preferences_text = self._preferences_to_text(preferences)
        preferences_embedding = embedding_model.embed(preferences_text)
        
        # Calculate semantic similarity
        semantic_score = cosine_similarity(
            [apartment_desc_embedding], 
            [preferences_embedding]
        )[0][0]
        
        # Combine direct feature matching with semantic matching
        combined_score = 0.7 * final_score + 0.3 * semantic_score
        
        return combined_score

    def _preferences_to_text(self, preferences: Dict) -> str:
        """Convert preferences dictionary to descriptive text"""
        descriptions = []
        for category, prefs in preferences.items():
            for feature, importance in prefs.items():
                if importance == 'Very Important':
                    descriptions.append(f"Must have good {feature}")
                elif importance == 'Somewhat':
                    descriptions.append(f"Preferably has {feature}")
        return " ".join(descriptions)

    def get_top_matches(self, 
                       apartments: List[Dict], 
                       preferences: Dict, 
                       embedding_model,
                       top_n: int = 5) -> List[Dict]:
        """
        Get top N matching apartments based on preferences
        """
        scored_apartments = [
            {
                **apt,
                'match_score': self.calculate_match_score(
                    apt, preferences, embedding_model
                )
            }
            for apt in apartments
        ]
        
        # Sort by match score
        sorted_apartments = sorted(
            scored_apartments,
            key=lambda x: x['match_score'],
            reverse=True
        )
        
        return sorted_apartments[:top_n]