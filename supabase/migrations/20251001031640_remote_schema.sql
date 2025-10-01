set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_assignments_and_exams(startdate timestamp with time zone, enddate timestamp with time zone)
 RETURNS TABLE(date timestamp with time zone, type text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT "dueDate" AS "date", 'assignment' AS "type"
    FROM assignments
    WHERE "dueDate" BETWEEN startDate AND endDate
    UNION
    SELECT "examDate" AS "date", 'exam' AS "type"
    FROM exams
    WHERE "examDate" BETWEEN startDate AND endDate;
END; $function$
;

CREATE OR REPLACE FUNCTION public.get_events_in_range(startdate timestamp with time zone, enddate timestamp with time zone)
 RETURNS TABLE(date timestamp with time zone, type text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT "dueDate"::timestamp with time zone AS "date", 'assignment' AS "type"
    FROM assignments
    WHERE "dueDate" BETWEEN startDate AND endDate
    UNION
    SELECT "examDate"::timestamp with time zone AS "date", 'exam' AS "type"
    FROM exams
    WHERE "examDate" BETWEEN startDate AND endDate;
END; $function$
;

CREATE OR REPLACE FUNCTION public.get_events_with_colors_in_range(startdate timestamp with time zone, enddate timestamp with time zone)
 RETURNS TABLE(date timestamp with time zone, type text, color text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        a."dueDate"::TIMESTAMP WITH TIME ZONE AS "date", 
        'assignment' AS "type",
        c."color" AS "color"
    FROM assignments a
    JOIN courses c ON a."course_id" = c."id"
    WHERE a."dueDate" BETWEEN startDate AND endDate
    
    UNION

    SELECT 
        e."examDate"::TIMESTAMP WITH TIME ZONE AS "date", 
        'exam' AS "type",
        NULL AS "color"  -- No course color for exams
    FROM exams e
    WHERE e."examDate" BETWEEN startDate AND endDate;
END; $function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.update_user_status_to_confirmed()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
IF NEW.email_confirmed_at IS NOT NULL THEN
    UPDATE public.profiles
    SET status = 'confirmed'
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
end;
$function$
;


