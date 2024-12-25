/*
 * @notice: This file contains all the interfaces & types used in the project
 *
 */

/*****************************
 *  TYPES DECLARATION
 * ****************************
 */

/*
 * @notice: Chip types available in the game
 */
export type ChipName = "b_boost" | "3xc" | "freehit" | "wildcard";

/*
 * @notice: Manager leagues available in the game
 */
export type LeagueType = "x" | "s";

/*
 * @notice: Player status in the game
 */
export type ElementStatus = "a" | "u" | "i" | "s" | "n" | "d";

/*****************************
 *  INTERFACES DECLARATION
 * ****************************
 */

/************* BOOTSRAP DATA ***********/
/*
 * @notice: Interface for chip played in a gameweek
 */
export interface EventChipPlay {
  chip_name: ChipName;
  num_played: number;
}

/*
 * @notice: Details of the highest scoring player in a gameweek
 */
export interface TopElementInfo {
  id: number;
  points: number;
}

/*
 * @notice: Interface for basic information of every gameweek
 * such as average score, highest score, top scoring player,
 * most captained player, most transferred in player, etc.
 *
 */
export interface Event {
  average_entry_score: number;
  chip_plays: EventChipPlay[];
  data_checked: boolean;
  deadline_time: string;
  deadline_time_epoch: number;
  deadline_time_game_offset: number;
  finished: boolean;
  highest_score: number | null;
  highest_scoring_entry: number | null;
  id: number;
  is_current: boolean;
  is_next: boolean;
  is_previous: boolean;
  most_captained: number | null;
  most_selected: number | null;
  most_transferred_in: number | null;
  most_vice_captained: number | null;
  name: string;
  top_element: number | null;
  top_element_info: TopElementInfo | null;
  transfers_made: number;
  cup_leagues_created: boolean;
  h2h_ko_matches_created: boolean;
}

/*
 * @notice: Information of all Premier League players including
 * points, status, value, match stats (goals, assists, etc.),
 * ICT index, etc.
 */
export interface Element {
  assists: number;
  bonus: number;
  bps: number;
  chance_of_playing_next_round: number | null;
  chance_of_playing_this_round: number | null;
  clean_sheets: number;
  code: number;
  corners_and_indirect_freekicks_order: number | null;
  corners_and_indirect_freekicks_text: string;
  cost_change_event_fall: number;
  cost_change_event: number;
  cost_change_start_fall: number;
  cost_change_start: number;
  creativity: string;
  creativity_rank_type: number | null;
  creativity_rank: number | null;
  direct_freekicks_order: number | null;
  direct_freekicks_text: string;
  dreamteam_count: number;
  element_type: number;
  ep_next: string | null;
  ep_this: string | null;
  event_points: number;
  first_name: string;
  form: string;
  goals_conceded: number;
  goals_scored: number;
  ict_index: string;
  ict_index_rank_type: number | null;
  ict_index_rank: number | null;
  id: number;
  in_dreamteam: boolean;
  influence: string;
  influence_rank_type: number | null;
  influence_rank: number | null;
  minutes: number;
  news_added: string | null;
  news: string;
  now_cost: number;
  own_goals: number;
  penalties_missed: number;
  penalties_order: number | null;
  penalties_saved: number;
  penalties_text: string;
  photo: string;
  points_per_game: string;
  red_cards: number;
  saves: number;
  second_name: string;
  selected_by_percent: string;
  special: boolean;
  squad_number: number | null;
  status: ElementStatus;
  team_code: number;
  team: number;
  threat: string;
  threat_rank_type: number | null;
  threat_rank: number | null;
  total_points: number;
  transfers_in_event: number;
  transfers_in: number;
  transfers_out_event: number;
  transfers_out: number;
  value_form: string;
  value_season: string;
  web_name: string;
  yellow_cards: number;
}

/*
 * @notice: Basic information of current Premier League clubs.
 */
export interface Team {
  code: number;
  draw: number;
  form: string | null;
  id: number;
  loss: number;
  name: string;
  played: number;
  points: number;
  position: number;
  pulse_id: number;
  short_name: string;
  strength: number;
  strength_attack_away: number;
  strength_attack_home: number;
  strength_defence_away: number;
  strength_defence_home: number;
  strength_overall_away: number;
  strength_overall_home: number;
  team_division: null;
  unavailable: boolean;
  win: number;
}

/*
 * @notice: Interface of phases of FPL season. (not really important)
 */
export interface Phase {
  id: number;
  name: string;
  start_event: number;
  stop_event: number;
}

/*
 * @notice: Interface for the game's settings and rules. (not really important)
 */
export interface GameSettings {
  cup_start_event_id: number | null;
  league_join_private_max: number;
  league_join_public_max: number;
  league_max_ko_rounds_private_h2h: number;
  league_max_size_private_h2h: number;
  league_max_size_public_classic: number;
  league_max_size_public_h2h: number;
  league_points_h2h_draw: number;
  league_points_h2h_lose: number;
  league_points_h2h_win: number;
  league_prefix_public: string;
  squad_squadplay: number;
  squad_squadsize: number;
  squad_team_limit: number;
  squad_total_spend: number;
  stats_form_days: number;
  sys_vice_captain_enabled: boolean;
  timezone: string;
  transfers_sell_on_fee: number;
  ui_currency_multiplier: number;
  ui_special_shirt_exclusions: any[];
  ui_use_special_shirts: boolean;
  league_h2h_tiebreak_stats: ["+goals_scored", "-goals_conceded"];
  transfers_cap: number;
  cup_qualifying_method: null;
  cup_stop_event_id: number | null;
  cup_type: null;
  league_ko_first_instead_of_random: boolean;
}

/*
 * @notice: Interface for different types of players in the game
 * such as Goalkeeper, Defender, Midfielder, Forward
 */
export interface ElementTypes {
  id: number;
  plural_name: string;
  plural_name_short: string;
  singular_name: string;
  singular_name_short: string;
  squad_max_play: number;
  squad_min_play: number;
  squad_select: number;
  sub_positions_locked: number[];
  ui_shirt_specific: boolean;
  element_count: number;
}

/*
 * @notice: Player stats available in the game
 */
export interface ElementStats {
  label: string;
  name: string;
}

/*
 * @notice: Interface for the bootstrap data
 *
 */
export interface Bootstrap {
  element_stats: ElementStats[];
  element_types: ElementTypes[];
  elements: Element[];
  events: Event[];
  game_settings: GameSettings;
  phases: Phase[];
  teams: Team[];
  total_players: number;
}

/************* ELEMENT SUMMARY DATA ***********/

/*
 * @notice: Interface for a player’s remaining fixtures of the season
 */
export interface ElementSummaryUpcomingFixture {
  code: number;
  difficulty: number;
  event: number;
  event_name: string;
  finished: boolean;
  id: number;
  is_home: boolean;
  kickoff_time: string;
  minutes: number;
  provisional_start_time: boolean;
  team_a: number;
  team_a_score: number | null;
  team_h: number;
  team_h_score: number | null;
}

/*
 * @notice:  Interface of player’s previous fixtures and its match stats.
 */
export interface ElementSummaryFixture {
  assists: number;
  bonus: number;
  bps: number;
  clean_sheets: number;
  creativity: string;
  element: number;
  fixture: number;
  goals_conceded: number;
  goals_scored: number;
  ict_index: string;
  influence: string;
  kickoff_time: string;
  minutes: number;
  opponent_team: number;
  own_goals: number;
  penalties_missed: number;
  penalties_saved: number;
  red_cards: number;
  round: number;
  saves: number;
  selected: number;
  team_a_score: number;
  team_h_score: number;
  threat: string;
  total_points: number;
  transfers_balance: number;
  transfers_in: number;
  transfers_out: number;
  value: number;
  was_home: boolean;
  yellow_cards: number;
}

/*
 * @notice:  Interface of player’s season stats
 */
export interface ElementSummarySeason {
  assists: number;
  bonus: number;
  bps: number;
  clean_sheets: number;
  creativity: string;
  element_code: number;
  end_cost: number;
  goals_conceded: number;
  goals_scored: number;
  ict_index: string;
  influence: string;
  minutes: number;
  own_goals: number;
  penalties_missed: number;
  penalties_saved: number;
  red_cards: number;
  saves: number;
  season_name: string;
  start_cost: number;
  threat: string;
  total_points: number;
  yellow_cards: number;
}

/*
 * @notice: Interface for a player’s detailed information divided into 3 section
 */
export interface PlayerSummary {
  history: ElementSummaryFixture[];
  history_past: ElementSummarySeason[];
  fixtures: ElementSummaryUpcomingFixture[];
}
