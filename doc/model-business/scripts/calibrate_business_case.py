#!/usr/bin/env python3
"""
Calibrazione trasparente e simulatore del Business Case 'Finestre sulla Danza'
(Framework: multimedia-book-dance-ecosystem v1.1.0 -> skill model-business).

Principi di trasparenza implementati:
1. Separazione rigorosa dei flussi finanziari:
   - Ricavi Cash Startup vs Barter Tecnico (riduzione costi reali) vs
     Fondi Pass-Through Terzi (borse di studio) vs Valore Economico Stakeholder.
2. Coerenza temporale:
   - Distinzione tra Ricavo Cash Cumulato 24 Mesi e Exit ARR (Month-24 Run-Rate).
3. Funnel Audience Deduplicato + Viralita' Smorzata (Damped K-Factor):
   - Riconcilia Reach Lorda -> Reach Unica -> Lettori Primari (>4 min) ->
     Cascata Virale smorzata su 3 ondate -> Utenti Unici -> Profili Zero-Party.
4. Struttura Costi Completa (P&L 24 Mesi = Anno 1 Lancio + Anno 2 Scala):
   - Capex Piattaforma, Core Editoriale, Costi Diretti per Modulo (COGS),
     Team Sales/ABM, Trigger Phygital/Seeding, G&A/CDN/GDPR, Break-Even & Payback.
5. Quadro Valore Bidirezionale a 4 Quadranti (Startup Monetario/Non-Monetario vs
   Stakeholder Monetario/Non-Monetario) per tutti i 5 Stakeholder di Livello 3.
"""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from typing import Dict, Any


@dataclass
class ScenarioParams:
    name: str
    description: str

    # --- 1. FONDAZIONI ED ENTI (3.1, 3.3-B2G, 4.2, 4.4) ---
    f1_deals_y1: int
    f1_deals_y2: int
    f1_price: float  # Pacchetto Istituzionale base (3.1 + 4.2: 1.000 licenze, 20 classi)
    f2_deals_y1: int
    f2_deals_y2: int
    f2_price: float  # Edizione Territoriale & Tourism (3.1 + 3.3-B2G + 4.4)
    f3_deals_y1: int
    f3_deals_y2: int
    f3_price: float  # Programma Regionale Annuale Integrato (-20% incluso)
    f_cogs_rate: float
    f_crm_entities_count_ratio: float  # quota di contratti con distribuzione CRM/portale pubblico ampio
    f_crm_list_size: int
    f_redemption_rate: float
    f_licenses_per_f1: int
    f_schools_per_f1: float
    f_schools_per_f3: float
    f_classes_per_school: float
    f_tourism_dest_count: int
    f_tourism_activations_per_dest: int
    f_tourism_booking_ctr: float
    f_tourism_avg_local_spend: float
    f_custom_platform_avoided_cost: float  # valore equivalente portale/progetto custom risparmiato dall'ente

    # --- 2. AZIENDE E BRAND (3.3-B2B, 4.5, 4.6-Insight) ---
    a_cult_deals_y1: int
    a_cult_deals_y2: int
    a_cult_price_y1: float
    a_cult_price_y2_blended: float  # include sconto -20% su programmi annuali
    a_cult_crm_list_size: int
    a_tech_deals_y1: int
    a_tech_deals_y2: int
    a_tech_gross_ticket: float
    a_tech_barter_share: float  # quota fornitura tecnica reale a riduzione costi produzione
    a_cogs_cult_rate: float
    a_cogs_tech_gross_rate: float
    a_dwell_time_min: float
    a_leads_per_tech_partner: int
    a_fair_cpl_benchmark: float  # CPL medio B2B in fiera tradizionale
    a_research_report_value_per_brand: float  # costo evitato ricerca di mercato esterna

    # --- 3. ISTITUZIONI E MEDIA (3.4, 3.5, 3.6) ---
    i_festival_specials_y1: int
    i_festival_specials_y2: int
    i_festival_users_per_special: int
    i_emv_per_unique_user: float
    i_festival_avoided_prod_cost: float
    i_festival_prod_cost_startup: float
    i_print_partners: int
    i_print_copies_total: int
    i_print_qr_activation_rate: float
    i_print_bridge_cost_startup: float
    i_inquiry_cycles: int
    i_press_clippings_per_cycle: int
    i_social_mentions_per_cycle: int
    i_inst_response_rate: float
    i_pipeline_contacts_per_special: int
    i_pipeline_conv_rate: float

    # --- 4. COMMUNITY DANZA & LIVING ARCHIVE (3.2, 4.1, 4.3) ---
    c_contest_stages_24m: int
    c_votes_per_stage: int
    c_donation_per_vote: float  # 100% pass-through a fondo borse di studio (€0 ricavo startup)
    c_scholarship_unit_value: float
    c_episode_retention_rate: float
    c_returning_mau_y2: int
    c_annual_call_visitors_y2: int
    c_call_ctr: float
    c_featured_calls_24m: int
    c_featured_call_price: float
    c_archive_price: float
    c_archive_licenses_y1: int
    c_archive_renewal_rate: float
    c_archive_new_y2: int
    c_archive_cogs_rate: float
    c_community_ops_annual_cost: float

    # --- 5. TECNOLOGIA & WHITE-LABEL (4.7, 4.6-Platform) ---
    t_sprint_deals_y1: int
    t_sprint_deals_y2: int
    t_sprint_price: float
    t_enterprise_deals_y1: int
    t_enterprise_deals_y2: int
    t_enterprise_price: float
    t_saas_maint_price: float  # canone annuale Y2 per progetti consegnati Y1
    t_wl_marginal_cost_rate: float  # 0.38 => margine di contribuzione 62% (2.63x)
    t_custom_dev_avoided_cost: float  # CAPEX sviluppo custom ex-novo evitato dal cliente

    # --- 6. FUNNEL AUDIENCE, VIRALITA' SMORZATA & ZERO-PARTY DATA ---
    reach_dedup_overlap_rate: float
    license_activation_rate: float  # quota licenze B2B/B2G effettivamente riscattate
    partner_deep_read_share: float  # quota aperture CRM/licenze che leggono > 4 min
    festival_deep_read_rate: float  # quota reach festival che legge > 4 min sull'ebook
    print_deep_read_share: float  # quota scan QR stampa che legge > 4 min
    tourism_deep_read_share: float  # quota attivazioni turistiche che legge > 4 min
    community_organic_deep_seeds: int  # lettori primari > 4 min da contest/bandi/social/spokes
    k_wave1: float  # K-factor prima ondata (nuovi lettori generati per lettore primario)
    viral_wave_decay: float  # fattore smorzamento per saturazione reti chiuse
    unique_user_dedup_ratio: float  # rapporto utenti unici / sessioni attive totali
    survey_completion_rate: float
    progressive_opt_in_rate: float

    # --- 7. COSTI DI STRUTTURA, TEAM, PIATTAFORMA & GTM (24 MESI) ---
    capex_platform_y1: float
    capex_platform_y2: float
    editorial_fixed_y1: float
    editorial_fixed_y2: float
    sales_abm_team_y1: float
    sales_abm_team_y2: float
    phygital_points_count: int
    phygital_unit_cost: float
    gtm_seeding_media_kit_24m: float
    ga_overhead_y1: float
    ga_overhead_y2: float


SCENARIOS: Dict[str, ScenarioParams] = {
    "conservativo": ScenarioParams(
        name="Scenario Conservativo (Stress-Test 24M)",
        description="Rampa prudente Anno 1 (validazione pilota), espansione selettiva Anno 2.",
        f1_deals_y1=3, f1_deals_y2=5, f1_price=9800,
        f2_deals_y1=1, f2_deals_y2=2, f2_price=14500,
        f3_deals_y1=0, f3_deals_y2=1, f3_price=18400,
        f_cogs_rate=0.25, f_crm_entities_count_ratio=0.35, f_crm_list_size=8000, f_redemption_rate=0.20,
        f_licenses_per_f1=1000, f_schools_per_f1=8.0, f_schools_per_f3=18.0, f_classes_per_school=3.4,
        f_tourism_dest_count=3, f_tourism_activations_per_dest=3200,
        f_tourism_booking_ctr=0.18, f_tourism_avg_local_spend=28.0,
        f_custom_platform_avoided_cost=30000,
        a_cult_deals_y1=1, a_cult_deals_y2=2, a_cult_price_y1=24000, a_cult_price_y2_blended=21600,
        a_cult_crm_list_size=12000,
        a_tech_deals_y1=1, a_tech_deals_y2=3, a_tech_gross_ticket=25000, a_tech_barter_share=0.25,
        a_cogs_cult_rate=0.30, a_cogs_tech_gross_rate=0.35,
        a_dwell_time_min=9.5, a_leads_per_tech_partner=36, a_fair_cpl_benchmark=220.0,
        a_research_report_value_per_brand=7500.0,
        i_festival_specials_y1=1, i_festival_specials_y2=1, i_festival_users_per_special=85000,
        i_emv_per_unique_user=1.05, i_festival_avoided_prod_cost=24000.0, i_festival_prod_cost_startup=4500.0,
        i_print_partners=2, i_print_copies_total=70000, i_print_qr_activation_rate=0.10,
        i_print_bridge_cost_startup=2500.0,
        i_inquiry_cycles=2, i_press_clippings_per_cycle=35, i_social_mentions_per_cycle=900,
        i_inst_response_rate=0.45, i_pipeline_contacts_per_special=12, i_pipeline_conv_rate=0.25,
        c_contest_stages_24m=6, c_votes_per_stage=2200, c_donation_per_vote=1.0,
        c_scholarship_unit_value=1000.0, c_episode_retention_rate=0.52,
        c_returning_mau_y2=4200, c_annual_call_visitors_y2=18000, c_call_ctr=0.15,
        c_featured_calls_24m=10, c_featured_call_price=350.0,
        c_archive_price=3000.0, c_archive_licenses_y1=8, c_archive_renewal_rate=0.80, c_archive_new_y2=12,
        c_archive_cogs_rate=0.10, c_community_ops_annual_cost=14000.0,
        t_sprint_deals_y1=0, t_sprint_deals_y2=2, t_sprint_price=24000.0,
        t_enterprise_deals_y1=0, t_enterprise_deals_y2=1, t_enterprise_price=45000.0,
        t_saas_maint_price=4500.0, t_wl_marginal_cost_rate=0.38, t_custom_dev_avoided_cost=85000.0,
        reach_dedup_overlap_rate=0.20, license_activation_rate=0.60, partner_deep_read_share=0.28,
        festival_deep_read_rate=0.05, print_deep_read_share=0.45, tourism_deep_read_share=0.25,
        community_organic_deep_seeds=6000, k_wave1=0.60, viral_wave_decay=0.42,
        unique_user_dedup_ratio=0.88, survey_completion_rate=0.48, progressive_opt_in_rate=0.42,
        capex_platform_y1=42000, capex_platform_y2=15000,
        editorial_fixed_y1=58000, editorial_fixed_y2=56000,
        sales_abm_team_y1=28000, sales_abm_team_y2=34000,
        phygital_points_count=260, phygital_unit_cost=35.0, gtm_seeding_media_kit_24m=16000.0,
        ga_overhead_y1=18000, ga_overhead_y2=22000,
    ),
    "calibrato_base": ScenarioParams(
        name="Business Case Calibrato Base (Startup 24M: Anno 1 + Anno 2)",
        description="Calibrazione realistica bottom-up per la startup: separazione Cash/Barter, ARR vs 24M, costi reali e break-even.",
        f1_deals_y1=4, f1_deals_y2=7, f1_price=9800,
        f2_deals_y1=2, f2_deals_y2=4, f2_price=14500,
        f3_deals_y1=0, f3_deals_y2=2, f3_price=18400,  # 19 contratti totali = €231.600 (ACV €12.189)
        f_cogs_rate=0.24, f_crm_entities_count_ratio=0.42, f_crm_list_size=10000, f_redemption_rate=0.25,
        f_licenses_per_f1=1000, f_schools_per_f1=8.5, f_schools_per_f3=20.0, f_classes_per_school=3.45,
        f_tourism_dest_count=6, f_tourism_activations_per_dest=4000,
        f_tourism_booking_ctr=0.21, f_tourism_avg_local_spend=32.0,
        f_custom_platform_avoided_cost=35000,
        a_cult_deals_y1=2, a_cult_deals_y2=3, a_cult_price_y1=24000, a_cult_price_y2_blended=21600,
        a_cult_crm_list_size=14000,
        a_tech_deals_y1=2, a_tech_deals_y2=4, a_tech_gross_ticket=28000, a_tech_barter_share=0.25,
        a_cogs_cult_rate=0.28, a_cogs_tech_gross_rate=0.35,
        a_dwell_time_min=11.0, a_leads_per_tech_partner=46, a_fair_cpl_benchmark=240.0,
        a_research_report_value_per_brand=9000.0,
        i_festival_specials_y1=1, i_festival_specials_y2=2, i_festival_users_per_special=140000,
        i_emv_per_unique_user=1.15, i_festival_avoided_prod_cost=28000.0, i_festival_prod_cost_startup=4800.0,
        i_print_partners=3, i_print_copies_total=120000, i_print_qr_activation_rate=0.13,
        i_print_bridge_cost_startup=2500.0,
        i_inquiry_cycles=2, i_press_clippings_per_cycle=55, i_social_mentions_per_cycle=1500,
        i_inst_response_rate=0.55, i_pipeline_contacts_per_special=13, i_pipeline_conv_rate=0.27,
        c_contest_stages_24m=10, c_votes_per_stage=3000, c_donation_per_vote=1.0,
        c_scholarship_unit_value=1000.0, c_episode_retention_rate=0.60,
        c_returning_mau_y2=6500, c_annual_call_visitors_y2=24000, c_call_ctr=0.17,
        c_featured_calls_24m=18, c_featured_call_price=350.0,
        c_archive_price=3000.0, c_archive_licenses_y1=14, c_archive_renewal_rate=0.85, c_archive_new_y2=24,
        c_archive_cogs_rate=0.10, c_community_ops_annual_cost=16000.0,
        t_sprint_deals_y1=1, t_sprint_deals_y2=2, t_sprint_price=24000.0,
        t_enterprise_deals_y1=0, t_enterprise_deals_y2=2, t_enterprise_price=45000.0,
        t_saas_maint_price=4500.0, t_wl_marginal_cost_rate=0.38, t_custom_dev_avoided_cost=95000.0,
        reach_dedup_overlap_rate=0.20, license_activation_rate=0.65, partner_deep_read_share=0.28,
        festival_deep_read_rate=0.05, print_deep_read_share=0.45, tourism_deep_read_share=0.25,
        community_organic_deep_seeds=8500, k_wave1=0.75, viral_wave_decay=0.44,
        unique_user_dedup_ratio=0.88, survey_completion_rate=0.54, progressive_opt_in_rate=0.45,
        capex_platform_y1=48000, capex_platform_y2=20000,
        editorial_fixed_y1=68000, editorial_fixed_y2=68000,
        sales_abm_team_y1=34000, sales_abm_team_y2=44000,
        phygital_points_count=420, phygital_unit_cost=38.0, gtm_seeding_media_kit_24m=24000.0,
        ga_overhead_y1=22000, ga_overhead_y2=28000,
    ),
    "benchmark_sito_riconciliato": ScenarioParams(
        name="Benchmark Sito Riconciliato (Target Aspirazionale 24M)",
        description="Riconciliazione esatta dei parametri mostrati sul sito (1,2M reach, 180k lettori, K=1,35, €0,40 direct CAC, €1,52M lordo).",
        f1_deals_y1=8, f1_deals_y2=16, f1_price=9800,
        f2_deals_y1=3, f2_deals_y2=7, f2_price=14500,
        f3_deals_y1=2, f3_deals_y2=4, f3_price=20000,  # 40 contratti = €500.200 (ACV €12.505)
        f_cogs_rate=0.24, f_crm_entities_count_ratio=0.45, f_crm_list_size=12000, f_redemption_rate=0.27,
        f_licenses_per_f1=1000, f_schools_per_f1=8.33, f_schools_per_f3=20.0, f_classes_per_school=3.44,
        f_tourism_dest_count=10, f_tourism_activations_per_dest=4800,
        f_tourism_booking_ctr=0.22, f_tourism_avg_local_spend=32.0,
        f_custom_platform_avoided_cost=40000,
        a_cult_deals_y1=4, a_cult_deals_y2=6, a_cult_price_y1=24000, a_cult_price_y2_blended=24000,  # 10 x 24k = €240.000
        a_cult_crm_list_size=16000,
        a_tech_deals_y1=4, a_tech_deals_y2=8, a_tech_gross_ticket=30000, a_tech_barter_share=0.30,  # 12 x 30k = €360.000 (€252k cash + €108k barter)
        a_cogs_cult_rate=0.28, a_cogs_tech_gross_rate=0.35,
        a_dwell_time_min=11.5, a_leads_per_tech_partner=53.33, a_fair_cpl_benchmark=250.0,
        a_research_report_value_per_brand=10000.0,
        i_festival_specials_y1=1, i_festival_specials_y2=1, i_festival_users_per_special=350000,
        i_emv_per_unique_user=1.20, i_festival_avoided_prod_cost=35000.0, i_festival_prod_cost_startup=5000.0,
        i_print_partners=4, i_print_copies_total=180000, i_print_qr_activation_rate=0.14,
        i_print_bridge_cost_startup=2500.0,
        i_inquiry_cycles=2, i_press_clippings_per_cycle=85, i_social_mentions_per_cycle=2400,
        i_inst_response_rate=0.60, i_pipeline_contacts_per_special=22, i_pipeline_conv_rate=0.27,
        c_contest_stages_24m=12, c_votes_per_stage=4000, c_donation_per_vote=1.0,
        c_scholarship_unit_value=1000.0, c_episode_retention_rate=0.64,
        c_returning_mau_y2=9500, c_annual_call_visitors_y2=34444, c_call_ctr=0.18,
        c_featured_calls_24m=0, c_featured_call_price=0.0,
        c_archive_price=3000.0, c_archive_licenses_y1=20, c_archive_renewal_rate=0.85, c_archive_new_y2=63,  # Y2 80 licenze = €240k exit ARR; 24M cum = €300k
        c_archive_cogs_rate=0.10, c_community_ops_annual_cost=18000.0,
        t_sprint_deals_y1=2, t_sprint_deals_y2=4, t_sprint_price=22500.0,
        t_enterprise_deals_y1=0, t_enterprise_deals_y2=2, t_enterprise_price=22500.0,  # 8 commesse x €22.500 = €180.000
        t_saas_maint_price=0.0, t_wl_marginal_cost_rate=0.38, t_custom_dev_avoided_cost=95000.0,
        reach_dedup_overlap_rate=0.20, license_activation_rate=0.65, partner_deep_read_share=0.24,
        festival_deep_read_rate=0.04, print_deep_read_share=0.45, tourism_deep_read_share=0.22,
        community_organic_deep_seeds=9500, k_wave1=0.90, viral_wave_decay=0.45,
        unique_user_dedup_ratio=0.875, survey_completion_rate=0.58, progressive_opt_in_rate=0.46,
        capex_platform_y1=50000, capex_platform_y2=22000,
        editorial_fixed_y1=72000, editorial_fixed_y2=72000,
        sales_abm_team_y1=38000, sales_abm_team_y2=48000,
        phygital_points_count=650, phygital_unit_cost=40.0, gtm_seeding_media_kit_24m=46000.0,
        ga_overhead_y1=24000, ga_overhead_y2=30000,
    ),
}


def compute_scenario(p: ScenarioParams) -> Dict[str, Any]:
    # 1. FONDAZIONI ED ENTI
    f_deals_y1 = p.f1_deals_y1 + p.f2_deals_y1 + p.f3_deals_y1
    f_deals_y2 = p.f1_deals_y2 + p.f2_deals_y2 + p.f3_deals_y2
    f_deals_tot = f_deals_y1 + f_deals_y2

    f_rev_y1 = p.f1_deals_y1 * p.f1_price + p.f2_deals_y1 * p.f2_price + p.f3_deals_y1 * p.f3_price
    f_rev_y2 = p.f1_deals_y2 * p.f1_price + p.f2_deals_y2 * p.f2_price + p.f3_deals_y2 * p.f3_price
    f_rev_tot = f_rev_y1 + f_rev_y2
    f_acv = f_rev_tot / f_deals_tot if f_deals_tot else 0.0
    f_cogs_tot = f_rev_tot * p.f_cogs_rate

    f_schools = round((p.f1_deals_y1 + p.f1_deals_y2) * p.f_schools_per_f1 + (p.f3_deals_y1 + p.f3_deals_y2) * p.f_schools_per_f3)
    f_classes = round(f_schools * p.f_classes_per_school)
    f_tour_activations = p.f_tourism_dest_count * p.f_tourism_activations_per_dest
    f_tour_bookings = round(f_tour_activations * p.f_tourism_booking_ctr)
    f_tour_economic_spillover = f_tour_bookings * p.f_tourism_avg_local_spend
    f_avoided_capex = f_deals_tot * p.f_custom_platform_avoided_cost

    # 2. AZIENDE E BRAND
    a_cult_deals_tot = p.a_cult_deals_y1 + p.a_cult_deals_y2
    a_cult_rev_y1 = p.a_cult_deals_y1 * p.a_cult_price_y1
    a_cult_rev_y2 = p.a_cult_deals_y2 * p.a_cult_price_y2_blended
    a_cult_rev_tot = a_cult_rev_y1 + a_cult_rev_y2

    a_tech_deals_tot = p.a_tech_deals_y1 + p.a_tech_deals_y2
    a_tech_gross_y1 = p.a_tech_deals_y1 * p.a_tech_gross_ticket
    a_tech_gross_y2 = p.a_tech_deals_y2 * p.a_tech_gross_ticket
    a_tech_gross_tot = a_tech_gross_y1 + a_tech_gross_y2
    a_tech_barter_tot = a_tech_gross_tot * p.a_tech_barter_share
    a_tech_cash_y1 = a_tech_gross_y1 * (1 - p.a_tech_barter_share)
    a_tech_cash_y2 = a_tech_gross_y2 * (1 - p.a_tech_barter_share)
    a_tech_cash_tot = a_tech_cash_y1 + a_tech_cash_y2

    a_cash_rev_tot = a_cult_rev_tot + a_tech_cash_tot
    a_cogs_cult = a_cult_rev_tot * p.a_cogs_cult_rate
    a_tech_gross_cogs = a_tech_gross_tot * p.a_cogs_tech_gross_rate
    a_tech_cash_cogs = max(0.0, a_tech_gross_cogs - a_tech_barter_tot)

    a_leads_tot = round(a_tech_deals_tot * p.a_leads_per_tech_partner)
    a_fair_equivalent_value = a_leads_tot * p.a_fair_cpl_benchmark
    a_research_value_tot = (a_cult_deals_tot + a_tech_deals_tot) * p.a_research_report_value_per_brand

    # 3. ISTITUZIONI E MEDIA
    i_specials_tot = p.i_festival_specials_y1 + p.i_festival_specials_y2
    i_festival_unique_users = i_specials_tot * p.i_festival_users_per_special
    i_emv_per_special = p.i_festival_users_per_special * p.i_emv_per_unique_user
    i_emv_tot = i_festival_unique_users * p.i_emv_per_unique_user
    i_avoided_prod_tot = i_specials_tot * p.i_festival_avoided_prod_cost
    i_print_digital_activations = round(p.i_print_copies_total * p.i_print_qr_activation_rate)
    i_press_clippings_tot = p.i_inquiry_cycles * p.i_press_clippings_per_cycle
    i_social_mentions_tot = p.i_inquiry_cycles * p.i_social_mentions_per_cycle
    i_pipeline_contacts = i_specials_tot * p.i_pipeline_contacts_per_special
    i_pipeline_deals = round(i_pipeline_contacts * p.i_pipeline_conv_rate)
    i_startup_prod_cost = i_specials_tot * p.i_festival_prod_cost_startup + p.i_print_partners * p.i_print_bridge_cost_startup

    # 4. COMMUNITY DANZA & LIVING ARCHIVE (4.1)
    c_votes_tot = p.c_contest_stages_24m * p.c_votes_per_stage
    c_scholarship_pool = c_votes_tot * p.c_donation_per_vote
    c_scholarships_count = round(c_scholarship_pool / p.c_scholarship_unit_value)
    c_call_applications_y2 = round(p.c_annual_call_visitors_y2 * p.c_call_ctr)
    c_featured_calls_rev = p.c_featured_calls_24m * p.c_featured_call_price

    c_archive_rev_y1 = p.c_archive_licenses_y1 * p.c_archive_price
    c_archive_renewed_y2 = round(p.c_archive_licenses_y1 * p.c_archive_renewal_rate)
    c_archive_active_y2 = c_archive_renewed_y2 + p.c_archive_new_y2
    c_archive_exit_arr = c_archive_active_y2 * p.c_archive_price
    c_archive_rev_24m_cash = c_archive_rev_y1 + c_archive_exit_arr
    c_archive_cogs = c_archive_rev_24m_cash * p.c_archive_cogs_rate
    c_ops_cost_24m = p.c_community_ops_annual_cost * 2

    # 5. TECNOLOGIA & WHITE-LABEL
    t_deals_y1 = p.t_sprint_deals_y1 + p.t_enterprise_deals_y1
    t_deals_y2 = p.t_sprint_deals_y2 + p.t_enterprise_deals_y2
    t_deals_tot = t_deals_y1 + t_deals_y2
    t_proj_rev_y1 = p.t_sprint_deals_y1 * p.t_sprint_price + p.t_enterprise_deals_y1 * p.t_enterprise_price
    t_proj_rev_y2 = p.t_sprint_deals_y2 * p.t_sprint_price + p.t_enterprise_deals_y2 * p.t_enterprise_price
    t_saas_rev_y2 = t_deals_y1 * p.t_saas_maint_price
    t_rev_y1 = t_proj_rev_y1
    t_rev_y2 = t_proj_rev_y2 + t_saas_rev_y2
    t_rev_tot = t_rev_y1 + t_rev_y2
    t_proj_rev_tot = t_proj_rev_y1 + t_proj_rev_y2
    t_proj_cogs = t_proj_rev_tot * p.t_wl_marginal_cost_rate
    t_saas_cogs = t_saas_rev_y2 * 0.15
    t_contrib_margin_pct = (t_proj_rev_tot - t_proj_cogs) / t_proj_rev_tot if t_proj_rev_tot else 0.0
    t_avoided_dev_capex = max(0.0, t_deals_tot * p.t_custom_dev_avoided_cost - t_proj_rev_tot)

    # 6. FUNNEL AUDIENCE REALISTICO + VIRALITA' SMORZATA
    f_crm_entities = round(f_deals_tot * p.f_crm_entities_count_ratio)
    f_crm_reach = f_crm_entities * p.f_crm_list_size
    a_crm_reach = a_cult_deals_tot * p.a_cult_crm_list_size
    crm_reach_total = f_crm_reach + a_crm_reach
    crm_redemptions = crm_reach_total * p.f_redemption_rate

    # Licenze dirette B2B/B2G (es. 1.000/contratto base)
    direct_licenses_issued = f_deals_tot * p.f_licenses_per_f1
    direct_licenses_activated = direct_licenses_issued * p.license_activation_rate

    crm_deep_readers = (crm_redemptions + direct_licenses_activated) * p.partner_deep_read_share
    fest_deep_readers = i_festival_unique_users * p.festival_deep_read_rate
    print_deep_readers = i_print_digital_activations * p.print_deep_read_share
    tour_deep_readers = f_tour_activations * p.tourism_deep_read_share

    # Reach totale (includendo spoken/social ~15% extra della reach istituzionale/CRM)
    community_social_reach = p.community_organic_deep_seeds * 6.0
    gross_reach = crm_reach_total + direct_licenses_issued + i_festival_unique_users + p.i_print_copies_total + f_tour_activations + community_social_reach
    unique_reach = round(gross_reach * (1 - p.reach_dedup_overlap_rate))

    primary_active_seeds = round(
        crm_deep_readers + fest_deep_readers + print_deep_readers + tour_deep_readers + p.community_organic_deep_seeds
    )
    # Cascata virale smorzata su 3 ondate: Wave 1 = k_wave1, Wave 2 = w1*(k_wave1*decay), Wave 3 = w2*(k_wave1*decay^2)
    w1 = p.k_wave1
    w2 = w1 * (p.k_wave1 * p.viral_wave_decay)
    w3 = w2 * (p.k_wave1 * (p.viral_wave_decay ** 2))
    effective_k_net = w1 + w2 + w3
    viral_multiplier = 1.0 + effective_k_net
    total_active_readers = round(primary_active_seeds * viral_multiplier)
    unique_active_users = round(total_active_readers * p.unique_user_dedup_ratio)
    zero_party_profiles = round(unique_active_users * p.survey_completion_rate * p.progressive_opt_in_rate)

    # 7. P&L COMPLETO STARTUP (Y1, Y2, 24M)
    rev_cash_y1 = f_rev_y1 + a_cult_rev_y1 + a_tech_cash_y1 + c_archive_rev_y1 + (c_featured_calls_rev * 0.35) + t_rev_y1
    rev_cash_y2 = f_rev_y2 + a_cult_rev_y2 + a_tech_cash_y2 + c_archive_exit_arr + (c_featured_calls_rev * 0.65) + t_rev_y2
    rev_cash_24m = rev_cash_y1 + rev_cash_y2
    rev_gross_incl_barter_24m = rev_cash_24m + a_tech_barter_tot

    cogs_tot_24m = (
        f_cogs_tot
        + a_cogs_cult
        + a_tech_cash_cogs
        + i_startup_prod_cost
        + c_archive_cogs
        + c_ops_cost_24m
        + t_proj_cogs
        + t_saas_cogs
    )
    gross_profit_24m = rev_cash_24m - cogs_tot_24m
    gross_margin_pct = gross_profit_24m / rev_cash_24m if rev_cash_24m else 0.0

    phygital_cost_24m = p.phygital_points_count * p.phygital_unit_cost
    direct_acq_spend_24m = phygital_cost_24m + p.gtm_seeding_media_kit_24m
    direct_cac_per_reader = direct_acq_spend_24m / total_active_readers if total_active_readers else 0.0

    sales_abm_24m = p.sales_abm_team_y1 + p.sales_abm_team_y2
    fully_loaded_cac = (direct_acq_spend_24m + sales_abm_24m) / total_active_readers if total_active_readers else 0.0

    capex_24m = p.capex_platform_y1 + p.capex_platform_y2
    editorial_fixed_24m = p.editorial_fixed_y1 + p.editorial_fixed_y2
    ga_24m = p.ga_overhead_y1 + p.ga_overhead_y2

    fixed_opex_24m = capex_24m + editorial_fixed_24m + sales_abm_24m + direct_acq_spend_24m + ga_24m
    ebitda_24m = gross_profit_24m - fixed_opex_24m
    ebitda_margin_pct = ebitda_24m / rev_cash_24m if rev_cash_24m else 0.0

    cogs_y1 = (
        f_rev_y1 * p.f_cogs_rate
        + a_cult_rev_y1 * p.a_cogs_cult_rate
        + max(0.0, a_tech_gross_y1 * p.a_cogs_tech_gross_rate - a_tech_gross_y1 * p.a_tech_barter_share)
        + p.i_festival_specials_y1 * p.i_festival_prod_cost_startup
        + p.i_print_bridge_cost_startup
        + c_archive_rev_y1 * p.c_archive_cogs_rate
        + p.c_community_ops_annual_cost
        + t_proj_rev_y1 * p.t_wl_marginal_cost_rate
    )
    cogs_y2 = cogs_tot_24m - cogs_y1
    opex_y1 = p.capex_platform_y1 + p.editorial_fixed_y1 + p.sales_abm_team_y1 + direct_acq_spend_24m * 0.45 + p.ga_overhead_y1
    opex_y2 = p.capex_platform_y2 + p.editorial_fixed_y2 + p.sales_abm_team_y2 + direct_acq_spend_24m * 0.55 + p.ga_overhead_y2
    ebitda_y1 = (rev_cash_y1 - cogs_y1) - opex_y1
    ebitda_y2 = (rev_cash_y2 - cogs_y2) - opex_y2

    breakeven_cash_rev = fixed_opex_24m / gross_margin_pct if gross_margin_pct > 0 else float("inf")

    return {
        "scenario": p.name,
        "startup_pnl_24m": {
            "cash_revenue_y1": round(rev_cash_y1),
            "cash_revenue_y2": round(rev_cash_y2),
            "cash_revenue_24m": round(rev_cash_24m),
            "barter_value_24m": round(a_tech_barter_tot),
            "gross_economic_value_24m": round(rev_gross_incl_barter_24m),
            "cogs_24m": round(cogs_tot_24m),
            "gross_profit_24m": round(gross_profit_24m),
            "gross_margin_pct": round(gross_margin_pct * 100, 1),
            "fixed_opex_incl_capex_24m": round(fixed_opex_24m),
            "ebitda_y1": round(ebitda_y1),
            "ebitda_y2": round(ebitda_y2),
            "ebitda_24m": round(ebitda_24m),
            "ebitda_margin_pct": round(ebitda_margin_pct * 100, 1),
            "breakeven_cash_revenue_24m": round(breakeven_cash_rev),
        },
        "revenue_mix_cash_24m": {
            "1_fondazioni_b2g": round(f_rev_tot),
            "2_aziende_cultural": round(a_cult_rev_tot),
            "2_aziende_tech_cash": round(a_tech_cash_tot),
            "4_living_archive_24m_cash": round(c_archive_rev_24m_cash),
            "4_featured_calls_24m": round(c_featured_calls_rev),
            "5_whitelabel_incl_saas": round(t_rev_tot),
        },
        "audience_and_kpis": {
            "gross_reach": round(gross_reach),
            "unique_reach_dedup": unique_reach,
            "primary_active_seeds": primary_active_seeds,
            "effective_k_net": round(effective_k_net, 2),
            "viral_multiplier_damped": round(viral_multiplier, 2),
            "total_active_readers": total_active_readers,
            "unique_active_users": unique_active_users,
            "zero_party_profiles": zero_party_profiles,
            "direct_acq_spend_eur": round(direct_acq_spend_24m),
            "direct_cac_eur": round(direct_cac_per_reader, 2),
            "fully_loaded_cac_eur": round(fully_loaded_cac, 2),
        },
        "stakeholders": {
            "1_fondazioni": {
                "deals_24m": f_deals_tot,
                "acv_eur": round(f_acv),
                "startup_cash_eur": round(f_rev_tot),
                "schools_reached": f_schools,
                "classes_adopted": f_classes,
                "redemption_pct": round(p.f_redemption_rate * 100, 1),
                "tourism_activations": f_tour_activations,
                "tourism_bookings": f_tour_bookings,
                "stakeholder_tourism_spillover_eur": round(f_tour_economic_spillover),
                "stakeholder_avoided_capex_eur": round(f_avoided_capex),
            },
            "2_aziende": {
                "cult_deals_24m": a_cult_deals_tot,
                "tech_deals_24m": a_tech_deals_tot,
                "startup_cash_eur": round(a_cash_rev_tot),
                "startup_barter_eur": round(a_tech_barter_tot),
                "startup_gross_value_eur": round(a_cult_rev_tot + a_tech_gross_tot),
                "dwell_time_min": p.a_dwell_time_min,
                "b2b_leads_generated": a_leads_tot,
                "stakeholder_fair_equiv_lead_value_eur": round(a_fair_equivalent_value),
                "stakeholder_research_value_eur": round(a_research_value_tot),
                "zero_party_profiles": zero_party_profiles,
            },
            "3_istituzioni": {
                "festival_specials": i_specials_tot,
                "festival_unique_users": i_festival_unique_users,
                "emv_per_special_eur": round(i_emv_per_special),
                "emv_total_24m_eur": round(i_emv_tot),
                "stakeholder_avoided_prod_cost_eur": round(i_avoided_prod_tot),
                "print_copies_exposed": p.i_print_copies_total,
                "print_qr_activations": i_print_digital_activations,
                "press_clippings_24m": i_press_clippings_tot,
                "social_mentions_24m": i_social_mentions_tot,
                "inst_response_rate_pct": round(p.i_inst_response_rate * 100, 1),
                "pipeline_contacts": i_pipeline_contacts,
                "pipeline_deals_originated": i_pipeline_deals,
                "startup_cost_to_serve_eur": round(i_startup_prod_cost),
            },
            "4_community_and_4_1": {
                "contest_stages": p.c_contest_stages_24m,
                "total_votes": c_votes_tot,
                "scholarship_fund_passthrough_eur": round(c_scholarship_pool),
                "scholarships_funded": c_scholarships_count,
                "episode_retention_pct": round(p.c_episode_retention_rate * 100, 1),
                "returning_mau_y2": p.c_returning_mau_y2,
                "call_applications_y2": c_call_applications_y2,
                "archive_licenses_y1": p.c_archive_licenses_y1,
                "archive_licenses_y2": c_archive_active_y2,
                "archive_exit_arr_eur": round(c_archive_exit_arr),
                "archive_24m_cash_eur": round(c_archive_rev_24m_cash),
                "featured_calls_24m_cash_eur": round(c_featured_calls_rev),
            },
            "5_tecnologia": {
                "projects_24m": t_deals_tot,
                "startup_cash_eur": round(t_rev_tot),
                "contrib_margin_pct": round(t_contrib_margin_pct * 100, 1),
                "time_to_market_weeks": 8,
                "stakeholder_net_dev_capex_saved_eur": round(t_avoided_dev_capex),
            },
        },
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Calibratore Business Case Finestre sulla Danza")
    parser.add_argument("--scenario", choices=list(SCENARIOS.keys()) + ["all"], default="all")
    parser.add_argument("--json", action="store_true", help="Output in formato JSON")
    args = parser.parse_args()

    keys = list(SCENARIOS.keys()) if args.scenario == "all" else [args.scenario]
    results = {k: compute_scenario(SCENARIOS[k]) for k in keys}

    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
        return

    for k, r in results.items():
        print("=" * 80)
        print(f"[{k.upper()}] {r['scenario']}")
        pnl = r["startup_pnl_24m"]
        aud = r["audience_and_kpis"]
        print(f"  Ricavi Cash Y1: €{pnl['cash_revenue_y1']:,} | Y2: €{pnl['cash_revenue_y2']:,} | Tot 24M: €{pnl['cash_revenue_24m']:,}")
        print(f"  Barter Tecnico 24M: €{pnl['barter_value_24m']:,} | Valore Economico Lordo: €{pnl['gross_economic_value_24m']:,}")
        print(f"  COGS 24M: €{pnl['cogs_24m']:,} | Gross Profit: €{pnl['gross_profit_24m']:,} ({pnl['gross_margin_pct']}%)")
        print(f"  Opex + Capex Fissi 24M: €{pnl['fixed_opex_incl_capex_24m']:,}")
        print(f"  EBITDA Y1: €{pnl['ebitda_y1']:,} | EBITDA Y2: €{pnl['ebitda_y2']:,} | EBITDA 24M: €{pnl['ebitda_24m']:,} ({pnl['ebitda_margin_pct']}%)")
        print(f"  Break-even Cash 24M: €{pnl['breakeven_cash_revenue_24m']:,}")
        print(
            f"  Reach Unica: {aud['unique_reach_dedup']:,} | Semi Primari: {aud['primary_active_seeds']:,} | "
            f"K_net: {aud['effective_k_net']} (x{aud['viral_multiplier_damped']}) -> Lettori Attivi: {aud['total_active_readers']:,}"
        )
        print(
            f"  Profili Zero-Party: {aud['zero_party_profiles']:,} | Direct Spend: €{aud['direct_acq_spend_eur']:,} | "
            f"CAC diretto: €{aud['direct_cac_eur']} | CAC fully-loaded: €{aud['fully_loaded_cac_eur']}"
        )
        print(f"  Mix Cash: {r['revenue_mix_cash_24m']}")
        for sk, sv in r["stakeholders"].items():
            print(f"    - {sk}: {sv}")


if __name__ == "__main__":
    main()
